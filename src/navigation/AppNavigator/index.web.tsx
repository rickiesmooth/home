import { Platform } from "react-native";

import { createBrowserApp } from "@react-navigation/web";
import {
  createSwitchNavigator,
  createAppContainer
} from "@react-navigation/core";
import { createStackNavigator } from "react-navigation-stack";
import MainTabNavigator from "../MainTabNavigator";

import { SignInScreen } from "../../screens/SignInScreen";
import { AuthLoadingScreen } from "../../screens/AuthLoadingScreen";

const AuthStack = createStackNavigator({ SignIn: SignInScreen });
console.log("WTF???EFEF");
const switchNavigator = createSwitchNavigator(
  {
    AuthLoading: {
      screen: AuthLoadingScreen,
      path: ""
    },
    App: MainTabNavigator,
    Auth: AuthStack
  },
  {
    initialRouteName: "AuthLoading"
  }
);

const createApp = Platform.select({
  web: createBrowserApp,
  default: createAppContainer
});

export default createApp(switchNavigator);
