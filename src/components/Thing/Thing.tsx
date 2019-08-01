import React from "react";
import { ThingModel, ThingsActions } from "../../store/interfaces";
import { View, Text, Switch } from "react-native";
import Slider from "../Slider/Slider.web";
import { throttle } from "../../utils/throttle";

type Props = {
  thing: ThingModel;
  updateThing: ThingsActions["updateThing"];
};

export const ThingElement: React.FC<Props> = React.memo(
  ({ thing, updateThing }) => {
    const {
      title,
      values,
      properties: { level, colorTemperature }
    } = thing;

    return (
      <View
        style={{
          backgroundColor: "lightblue",
          marginBottom: 12,
          maxWidth: 400
        }}
      >
        <p>{title}</p>
        {values && (
          <React.Fragment>
            <Text>{`level ${values.level}`}</Text>
            <Slider
              disabled={!values.on}
              value={values.level}
              onValueChange={throttle(levelValue => {
                updateThing(thing, { level: levelValue });
              }, 500)}
              minimumValue={level && level!.minimum}
              maximumValue={level && level!.maximum}
            />
            <Text>{`colorTemperature ${values.colorTemperature}`}</Text>
            <Slider
              disabled={!values.on}
              value={values.colorTemperature}
              onValueChange={throttle(colorTemperatureValue => {
                updateThing(thing, { colorTemperature: colorTemperatureValue });
              }, 500)}
              minimumValue={colorTemperature && colorTemperature!.minimum}
              maximumValue={colorTemperature && colorTemperature!.maximum}
            />
            <Switch
              value={values.on}
              onValueChange={on => updateThing(thing, { on })}
            />
          </React.Fragment>
        )}
      </View>
    );
  }
);
