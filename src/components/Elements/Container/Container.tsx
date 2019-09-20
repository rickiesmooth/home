import React from "react";
import { ScrollView, StyleSheet } from "react-native";

export const Container: React.FC = ({ children }) => (
  <ScrollView
    style={styles.container}
    contentContainerStyle={styles.contentContainer}
  >
    {children}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flexDirection: "row",
    maxWidth: 1300,
    marginHorizontal: "auto",
    flexWrap: "wrap",
    justifyContent: "center"
  }
});
