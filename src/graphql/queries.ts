// tslint:disable
// this is an auto generated file. This will be overwritten

export const getGroup = `query GetGroup($id: ID!) {
  getGroup(id: $id) {
    id
    name
    devices
    author {
      id
      username
      groups {
        nextToken
      }
      hubToken
      createdAt
      updatedAt
    }
  }
}
`;
export const listGroups = `query ListGroups(
  $filter: ModelGroupFilterInput
  $limit: Int
  $nextToken: String
) {
  listGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      devices
      author {
        id
        username
        hubToken
        createdAt
        updatedAt
      }
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    username
    groups {
      items {
        id
        name
        devices
      }
      nextToken
    }
    hubToken
    createdAt
    updatedAt
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      username
      groups {
        nextToken
      }
      hubToken
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
