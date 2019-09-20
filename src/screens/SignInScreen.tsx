import React from "react";
import {
  View,
  TextInput,
  Button,
  AsyncStorage,
  StyleSheet
} from "react-native";
import { useFetch } from "react-async";
import API from "../utils/api";
import { Redirect } from "../navigation/Redirect";
import { UserContext } from "../store/user";

export const SignIn: React.FC = () => {
  const { actions } = React.useContext(UserContext);
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: ""
  });

  const { url, opts } = API.login(credentials.email, credentials.password);
  const { run, isResolved, data } = useFetch<{ jwt: string }>(url, opts, {
    defer: true
  });

  if (isResolved) {
    AsyncStorage.setItem("userToken", data!.jwt);
    actions.login(data!.jwt);

    return <Redirect to="App" />;
  }

  return (
    <View style={styles.loginContainer}>
      <View style={{ marginVertical: "auto" }}>
        <TextInput
          style={styles.input}
          placeholder="username"
          textContentType="emailAddress"
          onChangeText={email => {
            setCredentials({
              ...credentials,
              email
            });
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={password =>
            setCredentials({
              ...credentials,
              password
            })
          }
        />
        <Button title="submit" onPress={run} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    maxWidth: 350,
    width: "100%",
    marginHorizontal: "auto",
    height: "100vh"
  },
  input: {
    marginTop: "auto",
    paddingVertical: 16
  }
});

export class SignInScreen extends React.Component {
  static navigationOptions = {
    title: "Sign in"
  };
  render() {
    return <SignIn />;
  }
}
