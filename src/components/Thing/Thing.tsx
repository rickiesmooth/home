import React from "react";
import Slider from "../Slider/Slider.web";
import { ThingModel } from "../../store/interfaces";
import { View, Text, Switch } from "react-native";
import { throttle } from "../../utils/throttle";

type Props = {
  thing: ThingModel;
};

export const ThingElement: React.FC<Props> = React.memo(({ thing }) => {
  const { title, values, updateThing, properties } = thing;
  console.log(thing);

  return (
    <View
      style={{
        backgroundColor: "lightblue",
        marginVertical: 8,
        paddingHorizontal: 24,
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
            onValueChange={throttle(
              (level: number) => updateThing({ level }),
              500
            )}
            minimumValue={properties.level && properties.level.minimum}
            maximumValue={properties.level && properties.level.maximum}
          />
          <Text>{`colorTemperature ${values.colorTemperature}`}</Text>
          <Slider
            disabled={!values.on}
            value={values.colorTemperature}
            onValueChange={throttle((colorTemperature: number) => {
              updateThing({ colorTemperature });
            }, 500)}
            minimumValue={
              properties.colorTemperature && properties.colorTemperature.minimum
            }
            maximumValue={
              (properties.colorTemperature &&
                properties.colorTemperature.maximum) ||
              2700
            }
          />
          <Switch value={values.on} onValueChange={on => updateThing({ on })} />
        </React.Fragment>
      )}
    </View>
  );
});
