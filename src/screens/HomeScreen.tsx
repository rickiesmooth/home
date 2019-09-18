import React from "react";
import { Text, Button, ScrollView, TextInput } from "react-native";
// import { ThingsContext } from "../store/ThingsContext";
// import { listGroups } from "../graphql/queries";
// import { createGroup } from "../graphql/mutations";
// import { CreateGroupMutationVariables, ListGroupsQuery } from "../graphql/API";

export const HomeScreen = () => {
  // const [addGroup, mutationResponse] = useMutation<
  //   void,
  //   CreateGroupMutationVariables
  // >(createGroup, {
  //   variables: {
  //     input: {
  //       name: ""
  //     }
  //   }
  // });

  // const { loading, data } = useQuery<ListGroupsQuery>(listGroups, {});

  // console.log(mutationResponse);

  return (
    <ScrollView>
      <Text>{"groups"}</Text>
      <TextInput placeholder="title" onChangeText={text => console.log(text)} />
      <Button
        title="update"
        onPress={() => {
          // addGroup();
        }}
      />
    </ScrollView>
  );
};
