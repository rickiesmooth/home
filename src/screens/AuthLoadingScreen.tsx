import React from "react";
import { ActivityIndicator, AsyncStorage, StatusBar, View } from "react-native";
// import { NavigationScreenProps } from "react-navigation";

export const AuthLoadingScreen: React.FC<any> = ({ navigation }) => {
  React.useEffect(() => {
    async function checkToken() {
      const userToken = await AsyncStorage.getItem("userToken");
      navigation.navigate(userToken ? "App" : "Auth");
    }
    checkToken();
  }, [navigation]);

  // Render any loading content that you like here
  return (
    <View>
      <p>loading</p>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};
