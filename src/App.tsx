import React from "react";
import { UserProvider } from "./store/user";
import AWSAppSyncClient, { AUTH_TYPE } from "aws-appsync";
import { ApolloProvider } from "@apollo/react-common";
import { ThingsProvider } from "./store/things";
import Amplify from "@aws-amplify/core";
import Auth from "@aws-amplify/auth";
import awsconfig from "./aws-exports";
import Root from "./navigation";

Amplify.configure(awsconfig);

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

export default () => (
  <ApolloProvider client={client}>
    <UserProvider>
      <ThingsProvider>
        <Root />
      </ThingsProvider>
    </UserProvider>
  </ApolloProvider>
);
