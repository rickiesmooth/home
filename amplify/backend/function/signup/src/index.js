const AWS = require("aws-sdk/global");
const url = process.env.API_GRAPHQL_GRAPHQLAPIENDPOINTOUTPUT;

const graphqlQuery = require("./query.js").mutation;
const gql = require("graphql-tag");
const AWSAppSyncClient = require("aws-appsync").default;
require("es6-promise").polyfill();
require("isomorphic-fetch");

const mutation = gql(graphqlQuery);
const appsyncClient = new AWSAppSyncClient(
  {
    url,
    region: AWS.config.region,
    auth: {
      type: "AWS_IAM",
      credentials: AWS.config.credentials
    },
    disableOffline: true
  },
  {
    defaultOptions: {
      query: {
        fetchPolicy: "network-only",
        errorPolicy: "all"
      }
    }
  }
);

exports.handler = async (event, _context, callback) => {
  console.log(event);
  try {
    const client = await appsyncClient.hydrated();
    await client.mutate({
      mutation,
      variables: {
        input: {
          id: event.request.userAttributes.sub,
          username: event.userName
        }
      }
    });
  } catch (error) {
    console.log(error);
  }

  callback(null, event);
};
