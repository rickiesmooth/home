import React from "react";
import { Text, StyleSheet, View } from "react-native";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { getUser } from "../../graphql/queries";
import { GetUserQuery } from "../../graphql/API";
import { Link } from "@react-navigation/web";
import { Group } from "../../components/Features/Group/Group";
import { Container } from "../../components/Elements/Container/Container";
import { UserContext } from "../../store/user";

const USER = gql`
  ${getUser}
`;

const Home = () => {
  const {
    state: { id }
  } = React.useContext(UserContext);
  const { loading, error, data } = useQuery<GetUserQuery>(USER, {
    variables: { id }
  });

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
        {data!.getUser!.groups!.items!.map(props => (
          <Group
            key={props!.id}
            devices={props!.devices || undefined}
            id={props!.id}
            name={props!.name}
          />
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
