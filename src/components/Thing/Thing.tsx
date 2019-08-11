import React from "react";
import Slider from "../Slider/Slider.web";
import { ThingModel } from "../../store/interfaces";
import { View, Text, Switch } from "react-native";
import { percentage, value } from "../../utils/percentages";

type Props = {
  thing: ThingModel;
};

export const ThingElement: React.FC<Props> = React.memo(({ thing }) => {
  const { title, values, updateThing, properties } = thing;

  const sharedProperties = {
    disabled: !values.on,
    minimumValue: 0,
    maximumValue: 1
  };

  const levelProperties = {
    ...sharedProperties,
    value: percentage(values.level, properties.level),
    onValueChange: (val: number) => {
      updateThing({ level: value(val, properties.level) });
    }
  };

  const colorTemperatureProperties = {
    ...sharedProperties,
    value: percentage(values.colorTemperature, properties.colorTemperature),
    onValueChange: (val: number) =>
      updateThing({
        colorTemperature: value(val, properties.colorTemperature)
      })
  };

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
          <Text>{`level ${levelProperties.value}`}</Text>
          <Slider {...levelProperties} />
          <Text>{`colorTemperature ${colorTemperatureProperties.value}`}</Text>
          <Slider {...colorTemperatureProperties} />
          <Switch value={values.on} onValueChange={on => updateThing({ on })} />
        </React.Fragment>
      )}
    </View>
  );
});
