// tslint:disable
// this is an auto generated file. This will be overwritten

export const createGroup = `mutation CreateGroup($input: CreateGroupInput!) {
  createGroup(input: $input) {
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
export const updateGroup = `mutation UpdateGroup($input: UpdateGroupInput!) {
  updateGroup(input: $input) {
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
export const deleteGroup = `mutation DeleteGroup($input: DeleteGroupInput!) {
  deleteGroup(input: $input) {
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
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
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
