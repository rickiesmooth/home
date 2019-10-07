// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateGroup = `subscription OnCreateGroup {
  onCreateGroup {
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
export const onUpdateGroup = `subscription OnUpdateGroup {
  onUpdateGroup {
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
export const onDeleteGroup = `subscription OnDeleteGroup {
  onDeleteGroup {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
