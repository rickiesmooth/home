import React from "react";
import AppNavigatorWeb from "./navigation/AppNavigator.web";
import { ThingsProvider } from "./store/ThingsContext";
import { Text } from "react-native";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import "./App.css";

Amplify.configure(awsconfig);

export default () => (
  <Text style={{ marginBottom: 8 }}>{"title"}</Text>
  // <ThingsProvider>
  //   <AppNavigatorWeb />
  // </ThingsProvider>
);
