import React from "react";
import AppNavigatorWeb from "./navigation/AppNavigator";
import { ThingsProvider, ThingsContext } from "./store/things";
import { UserProvider, UserContext } from "./store/user";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import "./App.css";

Amplify.configure(awsconfig);

const Root = () => {
  const {
    state: { loggedIn }
  } = React.useContext(UserContext);

  const {
    actions: { initThings }
  } = React.useContext(ThingsContext);

  const login = React.useCallback(initThings, []);
  React.useMemo(login, [loggedIn]);

  return <AppNavigatorWeb />;
};

export default () => {
  return (
    <UserProvider>
      <ThingsProvider>
        <Root />
      </ThingsProvider>
    </UserProvider>
  );
};
