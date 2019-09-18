import React, { useContext } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { ThingsContext } from "../store/things";
import { ThingElement } from "../components/Thing/Thing";

export const DevicesScreen = () => {
  const {
    state: { things, loading, error }
  } = useContext(ThingsContext);

  if (loading) return <Text>"Loading"</Text>;
  if (error) return <Text>"error "</Text>;
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {things.map(thing => (
        <ThingElement key={thing.id} thing={thing} />
      ))}
    </ScrollView>
  );
};

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
