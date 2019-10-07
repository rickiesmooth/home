import React from "react";
import { UserProvider, UserContext } from "./store/user";
import AWSAppSyncClient, { AUTH_TYPE } from "aws-appsync";
import { ApolloProvider } from "@apollo/react-common";
import AppNavigatorWeb from "./navigation/AppNavigator";
import { ThingsProvider, ThingsContext } from "./store/things";
import Amplify, { Auth } from "aws-amplify";
import gql from "graphql-tag";
import { getUser } from "./graphql/queries";

const USER = gql`
  ${getUser}
`;

Amplify.configure(awsconfig);

import awsconfig from "./aws-exports";
import { GetUserQueryVariables, GetUserQuery } from "./graphql/API";

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
    state,
    actions: { login }
  } = React.useContext(UserContext);
  const { loggedIn, hubToken } = state;
  const {
    actions: { initThings }
  } = React.useContext(ThingsContext);

  // check if we have loggedin user
  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(res =>
        client.query<GetUserQuery, GetUserQueryVariables>({
          query: USER,
          variables: {
            id: res.attributes.sub
          }
        })
      )
      .then(res => {
        console.log(res.data.getUser);
        return login(res.data.getUser);
      })
      .catch(e => console.log("Not signed in", e));
  }, []);
  // initialize things when we have hubToken from loggedin user
  const initialize = React.useCallback(() => {
    hubToken && initThings(hubToken);
  }, [hubToken, initThings]);
  React.useMemo(initialize, [loggedIn]);

  return <AppNavigatorWeb />;
};

export default () => (
  <ApolloProvider client={client}>
    <UserProvider>
      <ThingsProvider>
        <Root />
      </ThingsProvider>
    </UserProvider>
  </ApolloProvider>
);
