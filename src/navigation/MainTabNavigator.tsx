import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

// import TabBarIcon from "../components/TabBarIcon";
import { HomeScreen } from "../screens/HomeScreen";
import { DevicesScreen } from "../screens/Devices";
import { SettingsScreen } from "../screens/Settings";
import { TabBarIcon } from "../components/TabBarIcon/TabBarIcon";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: (focused: boolean) => (
    <TabBarIcon
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : `md-information-circle${focused ? "" : "-outline"}`
      }
    />
  )
};

HomeStack.path = "";

const DevicesStack = createStackNavigator(
  {
    Devices: DevicesScreen
  },
  config
);

DevicesStack.navigationOptions = {
  tabBarLabel: "Devices",
  tabBarIcon: (focused: boolean) => (
    <TabBarIcon name={Platform.OS === "ios" ? "ios-link" : "md-link"} />
  )
};

DevicesStack.path = "";

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: (focused: boolean) => (
    <TabBarIcon name={Platform.OS === "ios" ? "ios-options" : "md-options"} />
  )
};

SettingsStack.path = "";

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  DevicesStack,
  SettingsStack
});

tabNavigator.path = "";

export default tabNavigator;
