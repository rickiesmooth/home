import React, { useContext } from "react";
import { Text, StyleSheet } from "react-native";
import { ThingsContext } from "../store/things";
import { ThingElement } from "../components/Thing/Thing";
import { Container } from "../components/Elements/Container/Container";

export const Devices = () => {
  const {
    state: { things, loading, error }
  } = useContext(ThingsContext);

  if (loading) return <Text>"Loading"</Text>;
  if (error) return <Text>"error "</Text>;
  return (
    <Container>
      {things.map(thing => (
        <ThingElement key={thing.id} thing={thing} />
      ))}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flexDirection: "row",
    maxWidth: 1300,
    marginHorizontal: "auto",
    flexWrap: "wrap",
    justifyContent: "center"
  }
});

export class DevicesScreen extends React.Component {
  static navigationOptions = {
    title: "Devices"
  };
  render() {
    return <Devices />;
  }
}
