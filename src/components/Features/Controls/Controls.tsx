import React from "react";
import {
  ThingModelProperties,
  ThingModelValues,
  ThingPropertyNormalized
} from "../../../store/things/interfaces";
import { View, Text, Switch, ViewProps } from "react-native";
import Slider from "../../Elements/Slider/Slider.web";
import {
  valueToPercentage,
  percentageToValue
} from "../../../utils/percentages";
import pipe from "ramda/es/pipe";

interface Props extends ViewProps {
  properties: Partial<ThingModelProperties>;
  values: Partial<ThingModelValues>;
  updateThing: (val: Partial<ThingModelValues>) => void;
}

type SwitchProps = Omit<Props, "properties"> & {
  property: ThingPropertyNormalized;
};

const ControlsSwitcher: React.FC<SwitchProps> = ({
  updateThing,
  property,
  values
}) => {
  const sharedProperties = {
    disabled: !values.on,
    minimumValue: 0,
    maximumValue: 1
  };
  switch (property!["@type"]) {
    case "OnOffProperty":
      return (
        <Switch value={values.on} onValueChange={on => updateThing({ on })} />
      );
    case "BrightnessProperty":
      const levelPercentage = valueToPercentage(values.level, property);
      const handleLevelChange = pipe(
        (percentage: number) => percentageToValue(percentage, property),
        (value: number) => updateThing({ level: value })
      );
      return (
        <View>
          <Text>{`brightness level ${levelPercentage}`}</Text>
          <Slider
            {...sharedProperties}
            value={levelPercentage}
            onValueChange={handleLevelChange}
          />
        </View>
      );
    case "ColorTemperatureProperty":
      const handleColorTemperatureChange = pipe(
        (percentage: number) => percentageToValue(percentage, property),
        (value: number) => updateThing({ colorTemperature: value })
      );

      const colorTemperaturePercentage = valueToPercentage(
        values.colorTemperature,
        property
      );
      return (
        <View>
          <Text>{`colortemp level ${colorTemperaturePercentage}`}</Text>
          <Slider
            {...sharedProperties}
            value={colorTemperaturePercentage}
            onValueChange={handleColorTemperatureChange}
          />
        </View>
      );
    default:
      return <Text>Not implemented</Text>;
  }
};

export const Controls: React.FC<Props> = ({
  properties,
  values,
  updateThing,
  style
}) => (
  <View style={style}>
    {Object.values(properties).map((val, i) => (
      <ControlsSwitcher
        key={i}
        updateThing={updateThing}
        property={val!}
        values={values}
      />
    ))}
  </View>
);
