import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { HomeScreen } from "./HomeScreen";
import { TabBarIcon } from "../../components/Elements/TabBarIcon/TabBarIcon";
import { Platform } from "react-native";
import { CreateGroupScreen } from "./CreateGroupScreen";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

export const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    CreateGroup: CreateGroupScreen
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
