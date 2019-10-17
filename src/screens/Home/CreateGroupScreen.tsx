import React, { useContext } from "react";
import {
  Text,
  Button,
  TextInput,
  CheckBox,
  View,
  StyleSheet
} from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { CreateGroupMutationVariables } from "../../graphql/API";
import gql from "graphql-tag";
import { createGroup } from "../../graphql/mutations";
import { ThingsContext } from "../../store/things";
import { ThingModel } from "../../store/things/interfaces";
import { Controls } from "../../components/Features/Controls/Controls";
import { group } from "../../utils/group";
import { Container } from "../../components/Elements/Container/Container";
import { UserContext } from "../../store/user";
import { useNavigation } from "@react-navigation/core";

const ADD_GROUP = gql`
  ${createGroup}
`;

export const CreateGroupScreen = () => {
  const {
    state: { things, loading, error }
  } = useContext(ThingsContext);
  const {
    state: { id }
  } = useContext(UserContext);
  const navigation = useNavigation();
  const [groupName, setGroupName] = React.useState("");
  const [selected, setSelected] = React.useState<ThingModel[]>([]);
  const [addGroup] = useMutation<CreateGroupMutationVariables>(ADD_GROUP, {
    variables: {
      input: {
        name: groupName,
        devices: selected.map(({ id }) => id),
        groupAuthorId: id
      }
    },
    refetchQueries: ["GetUser"]
  });

  if (loading) {
    return <Text>loading</Text>;
  }

  if (error) {
    return <Text>error</Text>;
  }

  return (
    <Container>
      <View>
        <TextInput
          placeholder="Group title..."
          autoFocus
          style={styles.input}
          onChangeText={text => setGroupName(text)}
        />
        <View style={styles.groupItem}>
          <CheckBox
            style={styles.checkBox}
            value={selected.length === things.length}
            onValueChange={() => things.forEach(() => setSelected(things))}
          />
          <Text>Select all</Text>
        </View>
        {things.map(thing => {
          const hasSelected = !!selected.find(
            selectedThing => selectedThing.id === thing.id
          );
          const handleValueChange = (value: boolean) => {
            setSelected(prev =>
              value
                ? [...prev, thing]
                : prev.filter(previousThing => previousThing.id !== thing.id)
            );
          };
          return (
            <View key={thing.id} style={styles.groupItem}>
              <CheckBox
                style={styles.checkBox}
                value={hasSelected}
                onValueChange={handleValueChange}
              />
              <Text>{thing.title}</Text>
              <Controls
                properties={{ on: thing.properties.on }}
                values={thing.values}
                updateThing={thing.updateThing}
                style={styles.switch}
              />
            </View>
          );
        })}
        <Text>groupProperties</Text>
        {Object.values(
          group<ThingModel, "properties">(selected, "properties")
        ).map(props => (
          <Text key={props!.link}>{props!.title}</Text>
        ))}
        <Button
          title="update"
          disabled={!groupName || Object.entries(selected).length === 0}
          onPress={() => {
            addGroup();
            navigation.goBack();
          }}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  checkBox: {
    marginRight: 8
  },
  switch: {
    alignSelf: "flex-end",
    marginLeft: "auto"
  },
  input: {
    fontSize: 24,
    marginVertical: 16,
    borderBottomColor: "#EEE",
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1
  },
  groupItem: {
    paddingVertical: 16,
    flexDirection: "row"
  }
});
