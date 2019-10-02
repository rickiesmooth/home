import React from "react";
import { Text, StyleSheet, View } from "react-native";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { listGroups } from "../../graphql/queries";
import { ListGroupsQuery } from "../../graphql/API";
import { Link } from "@react-navigation/web";
import { Group } from "../../components/Features/Group/Group";
import { Container } from "../../components/Elements/Container/Container";

const LIST_GROUPS = gql`
  ${listGroups}
`;

const Home = () => {
  const { loading, error, data } = useQuery<ListGroupsQuery>(LIST_GROUPS);

  if (loading) return <Text>Loading</Text>;
  if (error) return <Text>{error.message}</Text>;

  return (
    <>
      <View
        style={{
          padding: 32,
          margin: "auto"
        }}
      >
        <Link routeName="CreateGroup">
          <Text style={styles.button}>create group</Text>
        </Link>
      </View>
      <Container>
        {data!.listGroups!.items!.map(props => (
          <Group key={props!.id} {...props!} />
        ))}
      </Container>
    </>
  );
};

export class HomeScreen extends React.Component<any> {
  static navigationOptions = {
    title: "Home"
  };
  render() {
    return <Home />;
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 4,
    textAlign: "center",
    backgroundColor: "#2196F3",
    color: "white"
  }
});
