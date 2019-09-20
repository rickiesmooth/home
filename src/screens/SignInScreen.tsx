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

export const SignIn: React.FC = () => {
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
    return <Redirect to="App" />;
  }

  return (
    <View style={styles.loginContainer}>
      <View>
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
        <Button
          title="submit"
          onPress={async () => {
            run();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    maxWidth: 350,
    width: "100%",
    marginHorizontal: "auto"
  },
  input: {
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
