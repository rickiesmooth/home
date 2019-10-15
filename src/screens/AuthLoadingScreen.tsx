import React from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import { UserContext } from "../store/user";

export const AuthLoadingScreen: React.FC<any> = ({ navigation }) => {
  const { state } = React.useContext(UserContext);

  React.useEffect(() => {
    if (state.loggedIn === false) {
      navigation.navigate("Auth");
    } else if (state.loggedIn === true) {
      navigation.navigate("App");
    }
  }, [state.loggedIn]);

  return (
    <View>
      <p>loading</p>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};
