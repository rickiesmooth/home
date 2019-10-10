// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateGroup = `subscription OnCreateGroup($groupAuthorId: String!) {
  onCreateGroup(groupAuthorId: $groupAuthorId) {
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
export const onUpdateGroup = `subscription OnUpdateGroup($groupAuthorId: String!) {
  onUpdateGroup(groupAuthorId: $groupAuthorId) {
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
export const onDeleteGroup = `subscription OnDeleteGroup($groupAuthorId: String!) {
  onDeleteGroup(groupAuthorId: $groupAuthorId) {
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
export const onUpdateUser = `subscription OnUpdateUser($id: String!) {
  onUpdateUser(id: $id) {
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
export const onDeleteUser = `subscription OnDeleteUser($id: String!) {
  onDeleteUser(id: $id) {
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
export const onCreateUser = `subscription OnCreateUser($id: String!) {
  onCreateUser(id: $id) {
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
