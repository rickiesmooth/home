import React from "react";
import { ActivityIndicator, StatusBar, View, AsyncStorage } from "react-native";
import { UserContext } from "../store/user";

export const AuthLoadingScreen: React.FC<any> = ({ navigation }) => {
  AsyncStorage.getItem("userToken").then(res => {
    const isLoggedIn = Boolean(res);
    navigation.navigate(isLoggedIn ? "App" : "Auth");
  });

  return (
    <View>
      <p>loading</p>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};
