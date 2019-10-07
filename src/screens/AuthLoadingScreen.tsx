import React from "react";
import { ActivityIndicator, StatusBar, View, AsyncStorage } from "react-native";
import { UserContext } from "../store/user";

export const AuthLoadingScreen: React.FC<any> = ({ navigation }) => {
  const {
    state: { id }
  } = React.useContext(UserContext);

  navigation.navigate(Boolean(id) ? "App" : "Auth");

  return (
    <View>
      <p>loading</p>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};
