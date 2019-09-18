// tslint:disable
// this is an auto generated file. This will be overwritten

export const getGroup = `query GetGroup($id: ID!) {
  getGroup(id: $id) {
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
export const listGroups = `query ListGroups(
  $filter: ModelGroupFilterInput
  $limit: Int
  $nextToken: String
) {
  listGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      devices {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getDevice = `query GetDevice($id: ID!) {
  getDevice(id: $id) {
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
export const listDevices = `query ListDevices(
  $filter: ModelDeviceFilterInput
  $limit: Int
  $nextToken: String
) {
  listDevices(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      group {
        id
        name
      }
    }
    nextToken
  }
}
`;
