import React from "react";
import { UserProvider, UserContext } from "./store/user";
import AWSAppSyncClient, { AUTH_TYPE } from "aws-appsync";
import { ApolloProvider } from "@apollo/react-common";
import AppNavigatorWeb from "./navigation/AppNavigator";
import { ThingsProvider, ThingsContext } from "./store/things";
import Amplify, { Auth } from "aws-amplify";

import awsconfig from "./aws-exports";

Amplify.configure({
  Auth: {
    region: awsconfig.aws_appsync_region, // REQUIRED - Amazon Cognito Region
    userPoolId: awsconfig.aws_user_pools_id, //OPTIONAL - Amazon Cognito User Pool ID
    userPoolWebClientId: awsconfig.aws_user_pools_web_client_id //User Pool App Client ID
  }
});

export const client = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  disableOffline: true,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () =>
      (await Auth.currentSession()).getIdToken().getJwtToken()
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
    <ApolloProvider client={client}>
      <UserProvider>
        <ThingsProvider>
          <Root />
        </ThingsProvider>
      </UserProvider>
    </ApolloProvider>
  );
};
