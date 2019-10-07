/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateGroupInput = {
  id?: string | null,
  name: string,
  devices?: Array< string > | null,
  groupAuthorId?: string | null,
};

export type UpdateGroupInput = {
  id: string,
  name?: string | null,
  devices?: Array< string > | null,
  groupAuthorId?: string | null,
};

export type DeleteGroupInput = {
  id?: string | null,
};

export type UpdateUserInput = {
  id: string,
  username?: string | null,
  hubToken?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteUserInput = {
  id?: string | null,
};

export type CreateUserInput = {
  id?: string | null,
  username: string,
  hubToken?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelGroupFilterInput = {
  id?: ModelIDFilterInput | null,
  name?: ModelStringFilterInput | null,
  devices?: ModelStringFilterInput | null,
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

export type ModelUserFilterInput = {
  id?: ModelIDFilterInput | null,
  username?: ModelStringFilterInput | null,
  hubToken?: ModelStringFilterInput | null,
  createdAt?: ModelStringFilterInput | null,
  updatedAt?: ModelStringFilterInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type CreateGroupMutationVariables = {
  input: CreateGroupInput,
};

export type CreateGroupMutation = {
  createGroup:  {
    __typename: "Group",
    id: string,
    name: string,
    devices: Array< string > | null,
    author:  {
      __typename: "User",
      id: string,
      username: string,
      groups:  {
        __typename: "ModelGroupConnection",
        nextToken: string | null,
      } | null,
      hubToken: string | null,
      createdAt: string | null,
      updatedAt: string | null,
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
    devices: Array< string > | null,
    author:  {
      __typename: "User",
      id: string,
      username: string,
      groups:  {
        __typename: "ModelGroupConnection",
        nextToken: string | null,
      } | null,
      hubToken: string | null,
      createdAt: string | null,
      updatedAt: string | null,
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
    devices: Array< string > | null,
    author:  {
      __typename: "User",
      id: string,
      username: string,
      groups:  {
        __typename: "ModelGroupConnection",
        nextToken: string | null,
      } | null,
      hubToken: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    } | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
};

export type UpdateUserMutation = {
  updateUser:  {
    __typename: "User",
    id: string,
    username: string,
    groups:  {
      __typename: "ModelGroupConnection",
      items:  Array< {
        __typename: "Group",
        id: string,
        name: string,
        devices: Array< string > | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    hubToken: string | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
};

export type DeleteUserMutation = {
  deleteUser:  {
    __typename: "User",
    id: string,
    username: string,
    groups:  {
      __typename: "ModelGroupConnection",
      items:  Array< {
        __typename: "Group",
        id: string,
        name: string,
        devices: Array< string > | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    hubToken: string | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
};

export type CreateUserMutation = {
  createUser:  {
    __typename: "User",
    id: string,
    username: string,
    groups:  {
      __typename: "ModelGroupConnection",
      items:  Array< {
        __typename: "Group",
        id: string,
        name: string,
        devices: Array< string > | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    hubToken: string | null,
    createdAt: string | null,
    updatedAt: string | null,
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
    devices: Array< string > | null,
    author:  {
      __typename: "User",
      id: string,
      username: string,
      groups:  {
        __typename: "ModelGroupConnection",
        nextToken: string | null,
      } | null,
      hubToken: string | null,
      createdAt: string | null,
      updatedAt: string | null,
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
      devices: Array< string > | null,
      author:  {
        __typename: "User",
        id: string,
        username: string,
        hubToken: string | null,
        createdAt: string | null,
        updatedAt: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    id: string,
    username: string,
    groups:  {
      __typename: "ModelGroupConnection",
      items:  Array< {
        __typename: "Group",
        id: string,
        name: string,
        devices: Array< string > | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    hubToken: string | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      username: string,
      groups:  {
        __typename: "ModelGroupConnection",
        nextToken: string | null,
      } | null,
      hubToken: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateGroupSubscription = {
  onCreateGroup:  {
    __typename: "Group",
    id: string,
    name: string,
    devices: Array< string > | null,
    author:  {
      __typename: "User",
      id: string,
      username: string,
      groups:  {
        __typename: "ModelGroupConnection",
        nextToken: string | null,
      } | null,
      hubToken: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    } | null,
  } | null,
};

export type OnUpdateGroupSubscription = {
  onUpdateGroup:  {
    __typename: "Group",
    id: string,
    name: string,
    devices: Array< string > | null,
    author:  {
      __typename: "User",
      id: string,
      username: string,
      groups:  {
        __typename: "ModelGroupConnection",
        nextToken: string | null,
      } | null,
      hubToken: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    } | null,
  } | null,
};

export type OnDeleteGroupSubscription = {
  onDeleteGroup:  {
    __typename: "Group",
    id: string,
    name: string,
    devices: Array< string > | null,
    author:  {
      __typename: "User",
      id: string,
      username: string,
      groups:  {
        __typename: "ModelGroupConnection",
        nextToken: string | null,
      } | null,
      hubToken: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    } | null,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser:  {
    __typename: "User",
    id: string,
    username: string,
    groups:  {
      __typename: "ModelGroupConnection",
      items:  Array< {
        __typename: "Group",
        id: string,
        name: string,
        devices: Array< string > | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    hubToken: string | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser:  {
    __typename: "User",
    id: string,
    username: string,
    groups:  {
      __typename: "ModelGroupConnection",
      items:  Array< {
        __typename: "Group",
        id: string,
        name: string,
        devices: Array< string > | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    hubToken: string | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser:  {
    __typename: "User",
    id: string,
    username: string,
    groups:  {
      __typename: "ModelGroupConnection",
      items:  Array< {
        __typename: "Group",
        id: string,
        name: string,
        devices: Array< string > | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    hubToken: string | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};
