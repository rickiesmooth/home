import React from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import { Container } from "../components/Elements/Container/Container";
import { useMutation } from "@apollo/react-hooks";
import { UpdateUserMutationVariables } from "../graphql/API";
import gql from "graphql-tag";
import { updateUser } from "../graphql/mutations";

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
  const [hubToken, handleChangeText] = React.useState("");
  const [updateUser] = useMutation<UpdateUserMutationVariables>(UPDATE_USER);

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
              updateUser({
                variables: {
                  input: {
                    id: "b7cbcf26-96f2-416f-9bda-e29c800f7636",
                    hubToken
                  }
                }
              })
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
