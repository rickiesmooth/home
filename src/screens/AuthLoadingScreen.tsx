import React from "react";
import { ActivityIndicator, StatusBar, View, AsyncStorage } from "react-native";

export const AuthLoadingScreen: React.FC<any> = ({ navigation }) => {
  AsyncStorage.getItem("userToken").then(res => {
    navigation.navigate(Boolean(res) ? "App" : "Auth");
  });

  return (
    <View>
      <p>loading</p>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};
