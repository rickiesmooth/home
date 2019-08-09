// tslint:disable
// this is an auto generated file. This will be overwritten

export const createGroup = `mutation CreateGroup($input: CreateGroupInput!) {
  createGroup(input: $input) {
    id
    name
    devices {
      items {
        id
        title
      }
      nextToken
    }
  }
}
`;
export const updateGroup = `mutation UpdateGroup($input: UpdateGroupInput!) {
  updateGroup(input: $input) {
    id
    name
    devices {
      items {
        id
        title
      }
      nextToken
    }
  }
}
`;
export const deleteGroup = `mutation DeleteGroup($input: DeleteGroupInput!) {
  deleteGroup(input: $input) {
    id
    name
    devices {
      items {
        id
        title
      }
      nextToken
    }
  }
}
`;
export const createDevice = `mutation CreateDevice($input: CreateDeviceInput!) {
  createDevice(input: $input) {
    id
    title
    group {
      id
      name
      devices {
        nextToken
      }
    }
  }
}
`;
export const updateDevice = `mutation UpdateDevice($input: UpdateDeviceInput!) {
  updateDevice(input: $input) {
    id
    title
    group {
      id
      name
      devices {
        nextToken
      }
    }
  }
}
`;
export const deleteDevice = `mutation DeleteDevice($input: DeleteDeviceInput!) {
  deleteDevice(input: $input) {
    id
    title
    group {
      id
      name
      devices {
        nextToken
      }
    }
  }
}
`;
