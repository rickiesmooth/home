import React from "react";
import AppNavigatorWeb from "./navigation/AppNavigator.web";
import { ThingsProvider } from "./store/ThingsContext";

import "./App.css";

export default () => (
  <ThingsProvider>
    <AppNavigatorWeb />
  </ThingsProvider>
);
