module.exports = {
  mutation: `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    username
    groups {
      items {
        id
        name
        devices
        authorId
      }
      nextToken
    }
    hubToken
    createdAt
    updatedAt
  }
}
`
};
