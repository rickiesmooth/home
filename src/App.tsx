import React from "react";
import AppNavigatorWeb from "./navigation/AppNavigator.web";
import { ThingsProvider } from "./store/ThingsContext";

import Amplify from "aws-amplify";
import awsconfig from "../aws-exports";

import "./App.css";

Amplify.configure(awsconfig);

export default () => (
  <ThingsProvider>
    <AppNavigatorWeb />
  </ThingsProvider>
);
