import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { Auth } from "aws-amplify";
import { Redirect } from "../navigation/Redirect";
// To federated sign in from Facebook

const SignInWithFacebook: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const signIn = () => Auth.federatedSignIn();

  if (isLoggedIn) {
    // AsyncStorage.setItem("userToken", data!.jwt);
    // actions.login(data!.jwt);

    return <Redirect to="App" />;
  }
  return (
    <View style={styles.loginContainer}>
      <Button onPress={signIn} title="Signin or signup" />
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
    return <SignInWithFacebook />;
  }
}
