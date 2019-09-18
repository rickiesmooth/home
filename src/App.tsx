import React from "react";
import AppNavigatorWeb from "./navigation/AppNavigator";
import { ThingsProvider, ThingsContext } from "./store/things";
import { UserProvider, UserContext } from "./store/user";
import Amplify from "aws-amplify";
import AWSAppSyncClient, { AUTH_TYPE } from "aws-appsync";
import awsconfig from "./aws-exports";
import "./App.css";
import { ApolloProvider } from "@apollo/react-common";

Amplify.configure(awsconfig);

export const client = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  disableOffline: true,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: awsconfig.aws_appsync_apiKey
  }
});

const Root = () => {
  const {
    state: { loggedIn, token }
  } = React.useContext(UserContext);

  const {
    actions: { initThings }
  } = React.useContext(ThingsContext);

  const initialize = React.useCallback(() => {
    token && initThings(token);
  }, [token, initThings]);

  React.useMemo(initialize, [loggedIn]);

  return <AppNavigatorWeb />;
};

export default () => {
  return (
    <ApolloProvider client={client as any}>
      <UserProvider>
        <ThingsProvider>
          <Root />
        </ThingsProvider>
      </UserProvider>
    </ApolloProvider>
  );
};
