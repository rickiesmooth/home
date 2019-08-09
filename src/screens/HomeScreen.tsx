import React, { useContext } from "react";
import { Text, ActivityIndicator, ScrollView } from "react-native";
import { ThingsContext } from "../store/ThingsContext";

export const HomeScreen = () => {
  const {
    state: { things }
  } = useContext(ThingsContext);
  if (things.loading || things.error) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView>
      <Text>{"groups"}</Text>
    </ScrollView>
  );
};
