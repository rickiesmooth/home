import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import Auth from "@aws-amplify/auth";
import {
  createStackNavigator,
  StackNavigationProp
} from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/core";
import { ISignUpResult } from "amazon-cognito-identity-js";
import { Input } from "../components/Elements/Input/Input";

type LoginParams = {
  signin: undefined;
  signup: undefined;
};
type SimpleStackNavigation = StackNavigationProp<LoginParams>;
type Props = {
  navigation: SimpleStackNavigation;
  route: RouteProp<LoginParams, keyof LoginParams>;
};

const LoginStack = createStackNavigator<LoginParams>();

const SignIn = ({ navigation, route: { name } }: Props) => {
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  function handleSubmit() {
    setIsLoading(true);
    Auth.signIn({ username, password }).catch(err => {
      setIsLoading(false);
      setError(err.message);
    });
  }

  const isFirst = navigation.isFirstRouteInParent();

  if (isLoading) {
    return (
      <View style={styles.content}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.content}>
      {error ? (
        <View style={styles.error}>
          <Text style={[styles.text, { color: "white" }]}>{error}</Text>
        </View>
      ) : null}
      <Input
        data-test="username-input"
        placeholder="Username"
        onChangeText={setUsername}
      />
      <Input
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        data-test="sign-in-password-input"
      />
      <Button
        data-test="sign-in-sign-in-button"
        onPress={handleSubmit}
        title={"Login"}
      />
      <TouchableOpacity
        style={styles.otherOption}
        onPress={() =>
          isFirst ? navigation.navigate("signup") : navigation.goBack()
        }
      >
        <Text style={styles.text}>{"Or sign up here"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const SignUp = ({ navigation }: Props) => {
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [error, setError] = React.useState("");
  const [signupResult, setSignupResult] = React.useState<ISignUpResult>();
  const [code, setCode] = React.useState<string>();

  function handleConfirm() {
    if (code) {
      Auth.confirmSignUp(username, code)
        .then(() => Auth.signIn(username, password))
        .catch(err => console.log(err));
    }
  }

  function handleSubmit() {
    Auth.signUp({ username, password })
      .then(res => setSignupResult(res))
      .catch(e => setError(e.message));
  }

  if (signupResult) {
    return (
      <View style={styles.content}>
        <Text
          style={styles.text}
        >{`we've your confirmation code to ${signupResult.codeDeliveryDetails.Destination}`}</Text>
        <Input
          key="code"
          placeholder="enter code here"
          onChangeText={setCode}
        />
        <Button onPress={handleConfirm} title={"confirm code"} />
      </View>
    );
  }

  return (
    <View style={styles.content}>
      {error ? (
        <View style={styles.error}>
          <Text style={[styles.text, { color: "white" }]}>{error}</Text>
        </View>
      ) : null}
      <Input placeholder="Username" onChangeText={setUsername} />
      <Input
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button onPress={handleSubmit} title={"Sign up"} />
      <TouchableOpacity
        style={styles.otherOption}
        onPress={() => navigation.navigate("signup")}
      >
        <Text style={styles.text}>{"Or sign up here"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const SignInNavigator = () => (
  <LoginStack.Navigator initialRouteName="signin">
    <LoginStack.Screen
      name={"signin"}
      options={{ title: "Sign In" }}
      component={SignIn}
    />
    <LoginStack.Screen
      name={"signup"}
      options={{ title: "Sign Up" }}
      component={SignUp}
    />
  </LoginStack.Navigator>
);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    margin: "auto",
    maxWidth: 500,
    width: "100%"
  },
  button: {
    margin: 8
  },
  error: {
    padding: 8,
    backgroundColor: "#B00020"
  },
  text: {
    textAlign: "center",
    margin: 16
  },
  otherOption: {
    marginTop: 16,
    borderColor: "#DDD",
    borderTopWidth: StyleSheet.hairlineWidth
  }
});
