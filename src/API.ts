/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateGroupInput = {
  id?: string | null,
  name: string,
};

export type UpdateGroupInput = {
  id: string,
  name?: string | null,
};

export type DeleteGroupInput = {
  id?: string | null,
};

export type CreateDeviceInput = {
  id?: string | null,
  title: string,
  deviceGroupId?: string | null,
};

export type UpdateDeviceInput = {
  id: string,
  title?: string | null,
  deviceGroupId?: string | null,
};

export type DeleteDeviceInput = {
  id?: string | null,
};

export type ModelGroupFilterInput = {
  id?: ModelIDFilterInput | null,
  name?: ModelStringFilterInput | null,
  and?: Array< ModelGroupFilterInput | null > | null,
  or?: Array< ModelGroupFilterInput | null > | null,
  not?: ModelGroupFilterInput | null,
};

export type ModelIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelDeviceFilterInput = {
  id?: ModelIDFilterInput | null,
  title?: ModelStringFilterInput | null,
  and?: Array< ModelDeviceFilterInput | null > | null,
  or?: Array< ModelDeviceFilterInput | null > | null,
  not?: ModelDeviceFilterInput | null,
};

export type CreateGroupMutationVariables = {
  input: CreateGroupInput,
};

export type CreateGroupMutation = {
  createGroup:  {
    __typename: "Group",
    id: string,
    name: string,
    devices:  {
      __typename: "ModelDeviceConnection",
      items:  Array< {
        __typename: "Device",
        id: string,
        title: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateGroupMutationVariables = {
  input: UpdateGroupInput,
};

export type UpdateGroupMutation = {
  updateGroup:  {
    __typename: "Group",
    id: string,
    name: string,
    devices:  {
      __typename: "ModelDeviceConnection",
      items:  Array< {
        __typename: "Device",
        id: string,
        title: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteGroupMutationVariables = {
  input: DeleteGroupInput,
};

export type DeleteGroupMutation = {
  deleteGroup:  {
    __typename: "Group",
    id: string,
    name: string,
    devices:  {
      __typename: "ModelDeviceConnection",
      items:  Array< {
        __typename: "Device",
        id: string,
        title: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreateDeviceMutationVariables = {
  input: CreateDeviceInput,
};

export type CreateDeviceMutation = {
  createDevice:  {
    __typename: "Device",
    id: string,
    title: string,
    group:  {
      __typename: "Group",
      id: string,
      name: string,
      devices:  {
        __typename: "ModelDeviceConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type UpdateDeviceMutationVariables = {
  input: UpdateDeviceInput,
};

export type UpdateDeviceMutation = {
  updateDevice:  {
    __typename: "Device",
    id: string,
    title: string,
    group:  {
      __typename: "Group",
      id: string,
      name: string,
      devices:  {
        __typename: "ModelDeviceConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type DeleteDeviceMutationVariables = {
  input: DeleteDeviceInput,
};

export type DeleteDeviceMutation = {
  deleteDevice:  {
    __typename: "Device",
    id: string,
    title: string,
    group:  {
      __typename: "Group",
      id: string,
      name: string,
      devices:  {
        __typename: "ModelDeviceConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type GetGroupQueryVariables = {
  id: string,
};

export type GetGroupQuery = {
  getGroup:  {
    __typename: "Group",
    id: string,
    name: string,
    devices:  {
      __typename: "ModelDeviceConnection",
      items:  Array< {
        __typename: "Device",
        id: string,
        title: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type ListGroupsQueryVariables = {
  filter?: ModelGroupFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGroupsQuery = {
  listGroups:  {
    __typename: "ModelGroupConnection",
    items:  Array< {
      __typename: "Group",
      id: string,
      name: string,
      devices:  {
        __typename: "ModelDeviceConnection",
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetDeviceQueryVariables = {
  id: string,
};

export type GetDeviceQuery = {
  getDevice:  {
    __typename: "Device",
    id: string,
    title: string,
    group:  {
      __typename: "Group",
      id: string,
      name: string,
      devices:  {
        __typename: "ModelDeviceConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type ListDevicesQueryVariables = {
  filter?: ModelDeviceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDevicesQuery = {
  listDevices:  {
    __typename: "ModelDeviceConnection",
    items:  Array< {
      __typename: "Device",
      id: string,
      title: string,
      group:  {
        __typename: "Group",
        id: string,
        name: string,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateGroupSubscription = {
  onCreateGroup:  {
    __typename: "Group",
    id: string,
    name: string,
    devices:  {
      __typename: "ModelDeviceConnection",
      items:  Array< {
        __typename: "Device",
        id: string,
        title: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateGroupSubscription = {
  onUpdateGroup:  {
    __typename: "Group",
    id: string,
    name: string,
    devices:  {
      __typename: "ModelDeviceConnection",
      items:  Array< {
        __typename: "Device",
        id: string,
        title: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteGroupSubscription = {
  onDeleteGroup:  {
    __typename: "Group",
    id: string,
    name: string,
    devices:  {
      __typename: "ModelDeviceConnection",
      items:  Array< {
        __typename: "Device",
        id: string,
        title: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreateDeviceSubscription = {
  onCreateDevice:  {
    __typename: "Device",
    id: string,
    title: string,
    group:  {
      __typename: "Group",
      id: string,
      name: string,
      devices:  {
        __typename: "ModelDeviceConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnUpdateDeviceSubscription = {
  onUpdateDevice:  {
    __typename: "Device",
    id: string,
    title: string,
    group:  {
      __typename: "Group",
      id: string,
      name: string,
      devices:  {
        __typename: "ModelDeviceConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnDeleteDeviceSubscription = {
  onDeleteDevice:  {
    __typename: "Device",
    id: string,
    title: string,
    group:  {
      __typename: "Group",
      id: string,
      name: string,
      devices:  {
        __typename: "ModelDeviceConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};
