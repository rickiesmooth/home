import React, { useContext } from "react";
import { Switch, Text, View } from "react-native";
import { ThingsContext } from "../store/ThingsContext";
// import { ThingValuesContext } from "../store/thing-values/ThingValuesContext";
import { ThingElement } from "../components/Thing/Thing";

// @TODO check if things can have own provider (do fetch actions for values, and state represents values )
// const {
//   state: { values },
//   actions: { updateValues }
// } = useContext(StoreContext);
// <ThingProvider></ThingProvider>

// function Button() {
//   let appContextValue = useContext(AppContext);
//   let theme = appContextValue.theme; // Your "selector"
//   return <ThemedButton theme={theme} />;
// }

// const ThemedButton = memo(({ theme }) => {
//   // The rest of your rendering logic
//   return <ExpensiveTree className={theme} />;
// });

export const DevicesScreen = () => {
  const {
    state: { things },
    actions: { updateThing }
  } = useContext(ThingsContext);

  if (things.loading) return <Text>"Loading"</Text>;
  if (things.error) return <Text>"error "</Text>;

  return things.result!.map(thing => (
    <ThingElement key={thing.id} thing={thing} updateThing={updateThing} />
  ));
};
