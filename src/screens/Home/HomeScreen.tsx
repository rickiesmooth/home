import React from "react";
import { Text, ScrollView, Button } from "react-native";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { listGroups } from "../../graphql/queries";
import { ListGroupsQuery } from "../../graphql/API";
import { Link } from "@react-navigation/web";
import { Group } from "../../components/Group/Group";
import { Container } from "../../components/Elements/Container/Container";

const LIST_GROUPS = gql`
  ${listGroups}
`;

const Home = () => {
  const { loading, error, data } = useQuery<ListGroupsQuery>(LIST_GROUPS);

  if (loading) return <Text>Loading</Text>;
  if (error) return <Text>{error.message}</Text>;

  return (
    <Container>
      {data!.listGroups!.items!.map(props => (
        <Group key={props!.id} {...props!} />
      ))}
      <Link routeName="CreateGroup">
        <Button title="create group" onPress={() => null} />
      </Link>
    </Container>
  );
};

export class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };
  render() {
    return <Home />;
  }
}
