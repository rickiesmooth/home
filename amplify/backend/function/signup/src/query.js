module.exports = {
  mutation: `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
  }
}
`
};
