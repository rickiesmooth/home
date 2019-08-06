import React, { useContext } from "react";
import { Text, View, ActivityIndicator, ScrollView } from "react-native";
import { ThingsContext } from "../store/ThingsContext";
import { ThingModel } from "../store/interfaces";

export const HomeScreen = () => {
  const {
    state: { things }
  } = useContext(ThingsContext);
  if (things.loading || things.error) {
    return <ActivityIndicator />;
  }
  const groupedResults = things.result!.reduce<Record<string, ThingModel[]>>(
    (result, thing) => {
      const key = thing.title.split("-")[0];
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(thing);
      return result;
    },
    {}
  );

  return (
    <ScrollView>
      {Object.entries(groupedResults).map(([key, value]) => {
        return (
          <View key={key}>
            <Text>{key}</Text>
            <Text>{`${value.length} lamps`}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};
