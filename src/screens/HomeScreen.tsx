import React from "react";
import { Text, Button, ScrollView, TextInput } from "react-native";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { listGroups } from "../graphql/queries";
import { createGroup } from "../graphql/mutations";
import { ListGroupsQuery, CreateGroupMutationVariables } from "../graphql/API";

export const LIST_GROUPS = gql`
  ${listGroups}
`;

export const ADD_GROUP = gql`
  ${createGroup}
`;

export const HomeScreen = () => {
  const [groupName, setGroupName] = React.useState("");
  const { loading, error, data } = useQuery<ListGroupsQuery>(LIST_GROUPS);

  const [addGroup] = useMutation<CreateGroupMutationVariables>(ADD_GROUP, {
    variables: {
      input: {
        name: groupName
      }
    }
  });

  if (loading) return <Text>Loading</Text>;
  if (error) return <Text>{error.message}</Text>;

  return (
    <ScrollView>
      {data!.listGroups!.items!.map(props => {
        return <Text key={props!.id}>{props!.name}</Text>;
      })}
      <TextInput
        placeholder="title"
        onChangeText={text => setGroupName(text)}
      />
      <Button
        title="update"
        onPress={() => {
          groupName && addGroup();
        }}
      />
    </ScrollView>
  );
};
