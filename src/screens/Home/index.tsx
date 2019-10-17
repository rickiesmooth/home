import React from "react";
import { ParamListBase } from "@react-navigation/core";
import {
  createStackNavigator,
  StackNavigationOptions,
  StackNavigationProp
} from "@react-navigation/stack";
import { CreateGroupScreen } from "./CreateGroupScreen";
import { Home } from "./Home";

type HomeStackParams = {
  home: undefined;
  createGroup: undefined;
};

type Props = {
  options?: StackNavigationOptions;
  navigation: StackNavigationProp<ParamListBase>;
};

const HomeStack = createStackNavigator<HomeStackParams>();

export const HomeScreen: React.FC<Props> = ({ options }) => {
  return (
    <HomeStack.Navigator {...options}>
      <HomeStack.Screen
        name="home"
        component={Home}
        options={{ title: "home" }}
      />
      <HomeStack.Screen
        name="createGroup"
        component={CreateGroupScreen}
        options={{ title: "Create Group" }}
      />
    </HomeStack.Navigator>
  );
};
