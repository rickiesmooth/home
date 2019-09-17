import React from "react";
import AppNavigatorWeb from "./navigation/AppNavigator.web";
import { ThingsProvider, ThingsContext } from "./store/things";
import { UserProvider, UserContext } from "./store/user";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import "./App.css";
import { AsyncStorage } from "react-native";

Amplify.configure(awsconfig);

const Initial = () => {
  const {
    state: { loggedIn },
    actions: { login }
  } = React.useContext(UserContext);

  const {
    actions: { initThings }
  } = React.useContext(ThingsContext);

  AsyncStorage.getItem("userToken").then(res => {
    if (!loggedIn) {
      login(true);
    }
  });

  React.useMemo(() => {
    if (loggedIn) {
      initThings();
    }
  }, [loggedIn]);

  return <AppNavigatorWeb />;
};

export default () => {
  return (
    <UserProvider>
      <ThingsProvider>
        <Initial />
      </ThingsProvider>
    </UserProvider>
  );
};
