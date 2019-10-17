import * as React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/Home";
import { Devices } from "../screens/Devices";
import { Settings } from "../screens/Settings";

const getTabBarIcon = (name: string) => ({
  color,
  horizontal
}: {
  color: string;
  horizontal: boolean;
}) => (
  <MaterialCommunityIcons
    name={name}
    color={color}
    size={horizontal ? 17 : 24}
  />
);

type BottomTabParams = {
  home: undefined;
  devices: undefined;
  settings: undefined;
  chat: undefined;
};

const BottomTabs = createBottomTabNavigator<BottomTabParams>();

export default function BottomTabsScreen() {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: getTabBarIcon("file-document-box"),
          tabBarButtonComponent: TouchableOpacity
        }}
      >
        {props => <HomeScreen {...props} options={{ headerMode: "none" }} />}
      </BottomTabs.Screen>
      <BottomTabs.Screen
        name="devices"
        component={Devices}
        options={{
          title: "Devices",
          tabBarIcon: getTabBarIcon("contacts"),
          tabBarButtonComponent: TouchableOpacity
        }}
      />
      <BottomTabs.Screen
        name="settings"
        component={Settings}
        options={{
          title: "Settings",
          tabBarIcon: getTabBarIcon("settings"),
          tabBarButtonComponent: TouchableOpacity
        }}
      />
    </BottomTabs.Navigator>
  );
}
