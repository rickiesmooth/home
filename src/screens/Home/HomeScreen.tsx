import React from "react";
import { Text, ScrollView, StyleSheet } from "react-native";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { listGroups } from "../../graphql/queries";
import { ListGroupsQuery } from "../../graphql/API";
import { Link } from "@react-navigation/web";

const LIST_GROUPS = gql`
  ${listGroups}
`;

const Home = () => {
  const { loading, error, data } = useQuery<ListGroupsQuery>(LIST_GROUPS);

  if (loading) return <Text>Loading</Text>;
  if (error) return <Text>{error.message}</Text>;

  return (
    <ScrollView>
      {data!.listGroups!.items!.map(props => {
        return (
          <Text style={styles.groupItem} key={props!.id}>
            {props!.name}
          </Text>
        );
      })}
      <Link routeName="CreateGroup">create group</Link>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  groupItem: {
    padding: 16
  }
});

export class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };
  render() {
    return <Home />;
  }
}
