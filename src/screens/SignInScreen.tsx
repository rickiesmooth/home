import React from "react";
import { View, TextInput, Button, AsyncStorage } from "react-native";

import { doFetch, FetchData } from "../utils/useFetch";
import { Redirect } from "../navigation/Redirect";
import { ThingsContext } from "../store/ThingsContext";
// import "./App.css";

const LoadUser = ({ email, password }: any) => {
  const [{ loading, error = null, result = null }, setState] = React.useState<
    FetchData<{ jwt: string }>
  >({
    loading: true
  });

  React.useEffect(() => {
    const postUser = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      if (!userToken) {
        const result = await doFetch<{ jwt: string }>("/login", {
          method: "POST",
          body: JSON.stringify({
            email,
            password
          })
        });
        setState(result);
      }
    };
    postUser();
  }, [email, password]);

  if (error) return <p>"error"</p>;
  if (loading) return <p>"loading"</p>;
  if (result) {
    AsyncStorage.setItem("userToken", result.jwt);
    return <Redirect to="App" />;
  }
  return null;
};

export const SignInScreen: React.FC = () => {
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
