import React from "react";
import { ThingModel } from "../../store/things/interfaces";
import { View, Text, StyleSheet } from "react-native";
import { Controls } from "../Controls/Controls";

type Props = {
  thing: ThingModel;
};

export const ThingElement: React.FC<Props> = React.memo(({ thing }) => (
  <View style={styles.thing}>
    <Text style={{ marginBottom: 8 }}>{thing.title}</Text>
    {thing.values && <Controls {...thing} />}
  </View>
));

const styles = StyleSheet.create({
  thing: {
    borderColor: "#EEE",
    borderRadius: 8,
    borderWidth: 1,
    padding: 24,
    width: 400,
    margin: 8
  }
});
