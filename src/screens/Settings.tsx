import React from "react";
import gql from "graphql-tag";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import { Container } from "../components/Elements/Container/Container";
import { useMutation } from "@apollo/react-hooks";
import { UpdateUserMutationVariables } from "../graphql/API";
import { updateUser } from "../graphql/mutations";
import { UserContext } from "../store/user";

const UPDATE_USER = gql`
  ${updateUser}
`;

export const Settings = () => {
  const settings = [
    "Domain",
    "Network",
    "Updates",
    "Authorizations",
    "Experiments",
    "Developer"
  ];
  const { state } = React.useContext(UserContext);
  const [hubToken, handleChangeText] = React.useState("");
  const [updateUser] = useMutation<UpdateUserMutationVariables>(UPDATE_USER);
  const { id } = state;

  React.useEffect(() => {
    handleChangeText(state.hubToken);
  }, [state.hubToken]);

  return (
    <Container>
      <View>
        <View>
          <TextInput
            value={hubToken}
            placeholder="token"
            onChangeText={handleChangeText}
          />
          <Button
            title="submit"
            onPress={() =>
              updateUser({ variables: { input: { id, hubToken } } })
            }
          />
        </View>
        {settings.map((setting, i) => (
          <Text key={i} style={styles.setting}>
            {setting}
          </Text>
        ))}
      </View>
    </Container>
  );
};

export class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings"
  };
  render() {
    return <Settings />;
  }
}

const styles = StyleSheet.create({
  setting: {
    paddingVertical: 8,
    fontSize: 16
  }
});
