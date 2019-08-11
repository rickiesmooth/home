import React from "react";
import { ActivityIndicator, StatusBar, View, AsyncStorage } from "react-native";
import { ThingsContext } from "../store/ThingsContext";
// import {  } from "react-navigation";

export const AuthLoadingScreen: React.FC<any> = ({ navigation }) => {
  const {
    state: { loggedIn },
    actions
  } = React.useContext(ThingsContext);

  const handleLogin = React.useCallback(() => {
    if (!loggedIn) {
      AsyncStorage.getItem("userToken").then(res => {
        const isLoggedIn = Boolean(res);
        actions.login(isLoggedIn);
        navigation.navigate(isLoggedIn ? "App" : "Auth");
      });
      return;
    }
    actions.initThings();
  }, [loggedIn, actions, navigation]);
  React.useMemo(handleLogin, []);

  // Render any loading content that you like here
  return (
    <View>
      <p>loading</p>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};
