import React, { useContext } from "react";
import {
  Text,
  ScrollView,
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
import {
  ThingModel,
  ThingModelProperties
} from "../../store/things/interfaces";
import { Controls } from "../../components/Controls/Controls";

const ADD_GROUP = gql`
  ${createGroup}
`;

const CreateGroup = () => {
  const {
    state: { things, loading, error }
  } = useContext(ThingsContext);
  const [groupName, setGroupName] = React.useState("");
  const [selected, setSelected] = React.useState<ThingModel[]>([]);
  const [addGroup] = useMutation<CreateGroupMutationVariables>(ADD_GROUP, {
    variables: {
      input: {
        name: groupName
      }
    }
  });

  const groupProperties = selected.reduce(
    (prev, next) => ({
      ...prev,
      ...next.properties
    }),
    {} as ThingModelProperties
  );

  if (loading) {
    return <Text>loading</Text>;
  }

  if (error) {
    return <Text>error</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <TextInput
        placeholder="title"
        style={styles.input}
        onChangeText={text => setGroupName(text)}
      />
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
            {/* <Switch style={styles.switch} /> */}
          </View>
        );
      })}
      <Text>groupProperties</Text>
      {Object.values(groupProperties).map(({ title, link }) => (
        <Text key={link}>{title}</Text>
      ))}
      <Button
        title="update"
        disabled={!groupName || Object.entries(selected).length === 0}
        onPress={() => {
          console.log("SELECTED", groupName, selected);
          // groupName && addGroup();
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 550,
    marginHorizontal: "auto"
  },
  checkBox: {
    marginRight: 8
  },
  switch: {
    alignSelf: "flex-end",
    marginLeft: "auto"
  },
  input: {
    fontSize: 24,
    marginVertical: 16
  },
  groupItem: {
    paddingVertical: 16,
    flexDirection: "row"
  }
});

export class CreateGroupScreen extends React.Component {
  static navigationOptions = {
    title: "Create Group"
  };
  render() {
    return <CreateGroup />;
  }
}
