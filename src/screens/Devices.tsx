import React, { useContext } from "react";
import { Switch, Text, View } from "react-native";
import { StoreContext } from "../store/StoreContext";
import {
  Thing,
  ThingProperties,
  FetchData,
  EnhancedActions
} from "../store/interfaces";

type Props = {
  thing: Thing;
  getData(href: string): void;
  thingProperties?: FetchData<ThingProperties>;
  updateThing: EnhancedActions["updateThingProperties"];
};

const ThingElement: React.FC<Props> = ({
  thing: { href, title },
  getData,
  updateThing,
  thingProperties
}) => {
  const fetchData = React.useCallback(
    href => !thingProperties && getData(href),
    [getData, thingProperties]
  );
  React.useMemo(() => fetchData(href), [fetchData, href]);
  const thingFetchResults = thingProperties && thingProperties.result;

  return (
    <View>
      <p>{title}</p>
      {thingFetchResults && (
        <React.Fragment>
          <Text>{`level ${thingFetchResults.level}`}</Text>
          <Text>{`temp ${thingFetchResults.colorTemperature}`}</Text>
          <Switch
            value={thingFetchResults.on}
            onValueChange={on => {
              console.log("changed to", { ...thingFetchResults, on });
              updateThing(href, { ...thingFetchResults, on });
              // set state and fetch
            }}
          />
        </React.Fragment>
      )}
    </View>
  );
};

export const DevicesScreen = () => {
  const {
    state: { things, properties },
    actions: { getThings, getThingProperties, updateThingProperties }
  } = useContext(StoreContext);

  React.useMemo(() => getThings(), []);

  if (things.loading) return <Text>"Loading"</Text>;
  if (things.error) return <Text>"error "</Text>;

  return things.result!.map(thing => (
    <ThingElement
      key={thing.id}
      thing={thing}
      thingProperties={properties[thing.href]}
      updateThing={updateThingProperties}
      getData={getThingProperties}
    />
  ));
};
