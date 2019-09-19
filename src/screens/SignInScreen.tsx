import React from "react";
import { View, TextInput, Button, AsyncStorage } from "react-native";

import { useFetch } from "../utils/useFetch";
import API from "../utils/api";
import { Redirect } from "../navigation/Redirect";

const LoadUser = ({ email, password }: any) => {
  const { url, opts } = API.login(email, password);
  const { data, error, isPending } = useFetch<{ jwt: string }>(url, opts);

  if (error) return <p>"error"</p>;
  if (isPending) return <p>"loading"</p>;
  if (data) {
    AsyncStorage.setItem("userToken", data.jwt);
    return <Redirect to="App" />;
  }
  return null;
};

export const SignIn: React.FC = () => {
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
    submit: false
  });
  const { submit, ...rest } = credentials;

  return (
    <View>
      <TextInput
        placeholder="username"
        onChangeText={email => {
          setCredentials({
            ...credentials,
            email
          });
        }}
      />
      <TextInput
        placeholder="password"
        onChangeText={password =>
          setCredentials({
            ...credentials,
            password
          })
        }
      />
      <Button
        title="submit"
        onPress={() => {
          setCredentials({
            ...credentials,
            submit: true
          });
        }}
      />
      {submit && <LoadUser {...rest} />}
    </View>
  );
};

export class SignInScreen extends React.Component {
  static navigationOptions = {
    title: "Sign in"
  };
  render() {
    return <SignIn />;
  }
}
