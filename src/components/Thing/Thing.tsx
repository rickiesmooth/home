import React from "react";
import { ThingModel, ThingsActions } from "../../store/interfaces";
import { View, Text, Switch } from "react-native";

type Props = {
  thing: ThingModel;
  updateThing: ThingsActions["updateThing"];
};

export const ThingElement: React.FC<Props> = React.memo(
  ({ thing, updateThing }) => {
    const { title, values, ...rest } = thing;
    const { level, colorTemperature, on } = values;
    return (
      <View>
        <p>{title}</p>
        {values && (
          <React.Fragment>
            <Text>{`level ${level}`}</Text>
            <Text>{`temp ${colorTemperature}`}</Text>
            <Switch
              value={on}
              onValueChange={on => {
                console.log({ on });
                updateThing(thing, { on });
              }}
            />
          </React.Fragment>
        )}
      </View>
    );
  }
);
