import React from "react";
import { Text, Button, ScrollView, TextInput } from "react-native";
// import { ThingsContext } from "../store/ThingsContext";
import { API, graphqlOperation } from "aws-amplify";
import { listGroups } from "../graphql/queries";
import { updateGroup } from "../graphql/mutations";

export const HomeScreen = () => {
  async function listTodos() {
    console.log("doing");
    const allTodos = await API.graphql(graphqlOperation(listGroups));
    console.log(allTodos);
  }

  async function updateTodos() {
    console.log("doing");
    const todo = { name: "Use AppSync", description: "Realtime and Offline" };

    console.log(todo);
    await API.graphql(graphqlOperation(updateGroup));
  }
  listTodos();
  return (
    <ScrollView>
      <Text>{"groups"}</Text>
      <TextInput placeholder="title" onChangeText={() => {}} />
      <Button title="update" onPress={updateTodos} />
    </ScrollView>
  );
};
