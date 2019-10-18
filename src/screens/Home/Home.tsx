import React from "react";
import { useNavigation } from "@react-navigation/core";
import { UserContext } from "../../store/user";
import { useQuery } from "@apollo/react-hooks";
import { GetUserQuery } from "../../graphql/API";
import { Text, View, Button } from "react-native";
import { Container } from "../../components/Elements/Container/Container";
import { Group } from "../../components/Features/Group/Group";
import gql from "graphql-tag";
import { getUser } from "../../graphql/queries";
import { ThingsContext } from "../../store/things";

const USER = gql`
  ${getUser}
`;

export const Home = () => {
  const navigation = useNavigation();
  const {
    state: { id }
  } = React.useContext(UserContext);
  const {
    state: { things, loading }
  } = React.useContext(ThingsContext);

  const response = useQuery<GetUserQuery>(USER, {
    variables: { id }
  });

  if (response.loading) return <Text>Loading</Text>;
  if (response.error) return <Text>{response.error.message}</Text>;
  return (
    <Container>
      <View
        style={{
          width: "100%"
        }}
      >
        <Button
          onPress={() => navigation.navigate("createGroup")}
          title="create group"
        />
      </View>
      {response.data!.getUser!.groups!.items!.map(props => (
        <Group
          key={props!.id}
          devices={props!.devices || undefined}
          things={things}
          id={props!.id}
          name={props!.name}
          loading={loading}
        />
      ))}
    </Container>
  );
};
