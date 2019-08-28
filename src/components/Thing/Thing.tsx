import React from "react";
import Slider from "../Slider/Slider.web";
import { ThingModel } from "../../store/interfaces";
import { View, Text, Switch } from "react-native";
import { valueToPercentage, percentageToValue } from "../../utils/percentages";
import pipe from "ramda/es/pipe";

type Props = {
  thing: ThingModel;
};

export const ThingElement: React.FC<Props> = React.memo(
  ({ thing: { title, values, updateThing, properties } }) => {
    const sharedProperties = {
      disabled: !values.on,
      minimumValue: 0,
      maximumValue: 1
    };

    const handleLevelChange = pipe(
      (percentage: number) => percentageToValue(percentage, properties.level),
      (value: number) => updateThing({ level: value })
    );

    const handleColorTemperatureChange = pipe(
      (percentage: number) =>
        percentageToValue(percentage, properties.colorTemperature),
      (value: number) => updateThing({ colorTemperature: value })
    );

    const levelPercentage = valueToPercentage(values.level, properties.level);
    const colorTemperaturePercentage = valueToPercentage(
      values.colorTemperature,
      properties.colorTemperature
    );

    return (
      <View
        style={{
          borderColor: "#EEE",
          borderRadius: 8,
          borderWidth: 1,
          padding: 24,
          width: 400,
          margin: 8
        }}
      >
        <Text style={{ marginBottom: 8 }}>{title}</Text>
        {values && (
          <React.Fragment>
            <Text>{`level ${levelPercentage}`}</Text>
            <Slider
              {...sharedProperties}
              value={levelPercentage}
              onValueChange={handleLevelChange}
            />
            <Text>{`colorTemperature ${colorTemperaturePercentage}`}</Text>
            <Slider
              {...sharedProperties}
              value={colorTemperaturePercentage}
              onValueChange={handleColorTemperatureChange}
            />
            <Switch
              value={values.on}
              onValueChange={on => updateThing({ on })}
            />
          </React.Fragment>
        )}
      </View>
    );
  }
);
