import React from "react";
import { Text, ActivityIndicator } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import pipe from "ramda/es/pipe";
import indexBy from "ramda/es/indexBy";
import prop from "ramda/es/prop";
import { ThingsContext } from "../../../store/things";
import { DeleteGroupMutationVariables } from "../../../graphql/API";
import { deleteGroup } from "../../../graphql/mutations";
import { group } from "../../../utils/group";
import { ThingModelValues, ThingModel } from "../../../store/things/interfaces";
import { Controls } from "../Controls/Controls";
import { Card } from "../../Elements/Card/Card";

const DELETE_GROUP = gql`
  ${deleteGroup}
`;

type Props = {
  devices?: string[];
  name: string;
  id: string;
};

export const Group: React.FC<Props> = ({ devices, name, id }) => {
  const {
    state: { things, loading }
  } = React.useContext(ThingsContext);
  const [deleteGroup] = useMutation<DeleteGroupMutationVariables>(
    DELETE_GROUP,
    {
      variables: { input: { id } },
      refetchQueries: ["GetUser"]
    }
  );

  if (!devices || !devices.length) return <Text>no devices</Text>;

  const groupThings = React.useMemo(() => {
    if (things.length) {
      return pipe(
        () => indexBy(prop("id"), things),
        obj => devices.map(id => obj[id])
      )();
    }
  }, [things]);

  const update = (val: Partial<ThingModelValues>) =>
    groupThings!.forEach(({ updateThing }) => updateThing(val));

  return (
    <Card
      title={name}
      onDelete={deleteGroup}
      subTitle={groupThings && groupThings.map(({ title }) => title).join(", ")}
    >
      {groupThings ? (
        <Controls
          values={group<ThingModel, "values">(groupThings, "values")}
          updateThing={update}
          properties={group<ThingModel, "properties">(
            groupThings,
            "properties"
          )}
        />
      ) : (
        <ActivityIndicator />
      )}
    </Card>
  );
};
