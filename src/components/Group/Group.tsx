import React from "react";
import { Text } from "react-native";
import { ThingsContext } from "../../store/things";
import { GetGroupQuery, DeleteGroupMutationVariables } from "../../graphql/API";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { deleteGroup } from "../../graphql/mutations";
import { group } from "../../utils/group";
import { ThingModel, ThingModelValues } from "../../store/things/interfaces";
import { Controls } from "../Controls/Controls";
import { Card } from "../Elements/Card/Card";

const DELETE_GROUP = gql`
  ${deleteGroup}
`;

export const Group: React.FC<GetGroupQuery["getGroup"]> = props => {
  const {
    state: { things, loading }
  } = React.useContext(ThingsContext);
  const [deleteGroup] = useMutation<DeleteGroupMutationVariables>(DELETE_GROUP);
  // const [groupValue, setGroupValues] = React.useState<ThingModelValues>();

  const groupThings = props!.devices!.map(
    id => things.find(thing => id === thing.id) as ThingModel
  );

  const update = (val: Partial<ThingModelValues>) =>
    groupThings.forEach(thing => thing.updateThing(val));

  if (loading) return <Text>Loading</Text>;

  return (
    <Card
      title={props.name}
      onDelete={() => {
        deleteGroup({
          variables: { input: { id: props!.id } }
        });
      }}
      subTitle={groupThings!.map(({ title }) => title).join(", ")}
    >
      <Controls
        values={group(groupThings, "values")}
        updateThing={update}
        properties={group(groupThings, "properties")}
      />
    </Card>
  );
};
