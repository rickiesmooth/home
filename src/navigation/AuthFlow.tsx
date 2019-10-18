import * as React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { ParamListBase } from "@react-navigation/core";
import {
  createStackNavigator,
  HeaderBackButton,
  StackNavigationProp
} from "@react-navigation/stack";
import { useLazyQuery } from "@apollo/react-hooks";
import Auth from "@aws-amplify/auth";
import { Hub } from "@aws-amplify/core";
import TabNavigator from "./BottomTabs";
import { SignInNavigator } from "../screens/SignInScreen";
import { UserContext } from "../store/user";
import gql from "graphql-tag";
import { getUser } from "../graphql/queries";
import { ThingsContext } from "../store/things";

type AuthStackParams = {
  splash: undefined;
  app: undefined;
  "sign-in": undefined;
};

const SplashScreen = () => (
  <View style={styles.content}>
    <ActivityIndicator />
  </View>
);

const SimpleStack = createStackNavigator<AuthStackParams>();

type Props = {
  navigation: StackNavigationProp<ParamListBase>;
};

const GET_USER = gql`
  ${getUser}
`;

export default function AuthStackScreen({ navigation }: Props) {
  const [userId, setUserId] = React.useState<string | undefined>(undefined);
  const [getUser, { loading, data }] = useLazyQuery(GET_USER, {
    variables: { id: userId }
  });
  const [isLoading, setIsLoading] = React.useState(true);

  const {
    state: { loggedIn, hubToken },
    actions: { login }
  } = React.useContext(UserContext);
  const {
    actions: { initThings }
  } = React.useContext(ThingsContext);

  // retrieve auth info from cognito
  React.useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      console.log(event, data);
      switch (event) {
        case "signIn":
          handleSignin(data.attributes.sub);
          break;
        case "signIn_failure":
        case "signOut":
          setUserId(undefined);
          setIsLoading(false);
          break;
      }
    });
    Auth.currentSession().then(data => {
      const isAdmin = data
        .getAccessToken()
        .payload["cognito:groups"].some((group: string) => group === "admin");
      console.log("admin is", isAdmin);
    });

    Auth.currentAuthenticatedUser()
      .then(({ attributes: { sub } }) => handleSignin(sub))
      .catch(e => {
        setIsLoading(false);
        console.log("Not signed in", e);
      });
  }, []);

  React.useMemo(() => {
    loggedIn && setIsLoading(false);
  }, [loggedIn]);

  // initialize things when we have hubToken from loggedin user
  React.useEffect(() => {
    hubToken && initThings(hubToken);
  }, [loggedIn]);

  function handleSignin(id: string) {
    setUserId(id);
    getUser();
  }

  if (data && !loggedIn) {
    login(data.getUser);
  }

  const canGoBack = navigation.canGoBack();

  return (
    <SimpleStack.Navigator
      screenOptions={{
        headerLeft: () =>
          canGoBack ? <HeaderBackButton onPress={navigation.goBack} /> : null
      }}
    >
      {isLoading ? (
        <SimpleStack.Screen
          name="splash"
          component={SplashScreen}
          options={{ title: "loading..." }}
        />
      ) : userId === undefined ? (
        <SimpleStack.Screen name="sign-in" options={{ header: null }}>
          {() => <SignInNavigator />}
        </SimpleStack.Screen>
      ) : (
        <SimpleStack.Screen name="app" options={{ header: null }}>
          {() => <TabNavigator />}
        </SimpleStack.Screen>
      )}
    </SimpleStack.Navigator>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center"
  }
});
