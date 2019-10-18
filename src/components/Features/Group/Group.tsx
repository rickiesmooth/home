import React from "react";
import { Text, ActivityIndicator } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { pipe, indexBy, prop } from "ramda";
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

export type Props = {
  devices?: string[];
  things: ThingModel[];
  loading: boolean;
  name: string;
  id: string;
};

export const Group: React.FC<Props> = ({
  loading,
  devices = [],
  things,
  name,
  id
}) => {
  const [deleteGroup] = useMutation<DeleteGroupMutationVariables>(
    DELETE_GROUP,
    {
      variables: { input: { id } },
      refetchQueries: ["GetUser"]
    }
  );

  const groupThings = React.useMemo(() => {
    if (things.length && devices.length) {
      return pipe(
        () => indexBy(prop("id"), things),
        obj => devices.map(id => obj[id])
      )();
    }
  }, [things, devices]);

  const update = (val: Partial<ThingModelValues>) =>
    groupThings!.forEach(({ updateThing }) => updateThing(val));

  if (!loading && (devices.length === 0 || things.length === 0)) {
    return <Text>no devices</Text>;
  }

  return (
    <Card
      title={name}
      onDelete={deleteGroup}
      subTitle={groupThings && groupThings.map(({ title }) => title).join(", ")}
    >
      {!loading && groupThings ? (
        <Controls
          values={group<ThingModel, "values">(groupThings, "values")}
          updateThing={update}
          properties={group<ThingModel, "properties">(
            groupThings,
            "properties"
          )}
        />
      ) : (
        <ActivityIndicator data-testid="loader" />
      )}
    </Card>
  );
};
