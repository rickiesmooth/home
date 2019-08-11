import React, { useContext } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { ThingsContext } from "../store/ThingsContext";
import { ThingElement } from "../components/Thing/Thing";

export const DevicesScreen = () => {
  const {
    state: { things },
    actions
  } = useContext(ThingsContext);

  React.useMemo(() => {
    if (things.loading) {
      actions.initThings();
    }
  }, [things.loading, actions]);

  if (things.loading) return <Text>"Loading"</Text>;
  if (things.error) return <Text>"error "</Text>;
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {things.result!.map(thing => (
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
