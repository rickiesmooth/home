import React, { useContext } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { ThingsContext } from "../store/ThingsContext";
import { ThingElement } from "../components/Thing/Thing";

export const DevicesScreen = () => {
  const {
    state: { things }
  } = useContext(ThingsContext);

  if (things.loading) return <Text>"Loading"</Text>;
  if (things.error) return <Text>"error "</Text>;
  return (
    <ScrollView style={styles.container}>
      {things.result!.map(thing => (
        <ThingElement key={thing.id} thing={thing} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
