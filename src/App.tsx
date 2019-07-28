import React from "react";
import AppNavigatorWeb from "./navigation/AppNavigator.web";
import { StoreProvider } from "./store/StoreContext";
import "./App.css";

export default () => (
  <StoreProvider>
    <AppNavigatorWeb />
  </StoreProvider>
);
