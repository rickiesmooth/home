import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Container } from "../components/Elements/Container/Container";

export const Settings = () => {
  const settings = [
    "Domain",
    "Network",
    "Updates",
    "Authorizations",
    "Experiments",
    "Developer"
  ];
  return (
    <Container>
      <View>
        {settings.map(setting => (
          <Text style={styles.setting}>{setting}</Text>
        ))}
      </View>
    </Container>
  );
};

export class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings"
  };
  render() {
    return <Settings />;
  }
}

const styles = StyleSheet.create({
  setting: {
    paddingVertical: 8,
    fontSize: 16
  }
});
