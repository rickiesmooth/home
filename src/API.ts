/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateMyTypeInput = {
  id?: string | null,
  title: string,
  content: string,
  price?: number | null,
  rating?: number | null,
};

export type UpdateMyTypeInput = {
  id: string,
  title?: string | null,
  content?: string | null,
  price?: number | null,
  rating?: number | null,
};

export type DeleteMyTypeInput = {
  id?: string | null,
};

export type ModelMyTypeFilterInput = {
  id?: ModelIDFilterInput | null,
  title?: ModelStringFilterInput | null,
  content?: ModelStringFilterInput | null,
  price?: ModelIntFilterInput | null,
  rating?: ModelFloatFilterInput | null,
  and?: Array< ModelMyTypeFilterInput | null > | null,
  or?: Array< ModelMyTypeFilterInput | null > | null,
  not?: ModelMyTypeFilterInput | null,
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

export type ModelIntFilterInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  contains?: number | null,
  notContains?: number | null,
  between?: Array< number | null > | null,
};

export type ModelFloatFilterInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  contains?: number | null,
  notContains?: number | null,
  between?: Array< number | null > | null,
};

export type CreateMyTypeMutationVariables = {
  input: CreateMyTypeInput,
};

export type CreateMyTypeMutation = {
  createMyType:  {
    __typename: "MyType",
    id: string,
    title: string,
    content: string,
    price: number | null,
    rating: number | null,
  } | null,
};

export type UpdateMyTypeMutationVariables = {
  input: UpdateMyTypeInput,
};

export type UpdateMyTypeMutation = {
  updateMyType:  {
    __typename: "MyType",
    id: string,
    title: string,
    content: string,
    price: number | null,
    rating: number | null,
  } | null,
};

export type DeleteMyTypeMutationVariables = {
  input: DeleteMyTypeInput,
};

export type DeleteMyTypeMutation = {
  deleteMyType:  {
    __typename: "MyType",
    id: string,
    title: string,
    content: string,
    price: number | null,
    rating: number | null,
  } | null,
};

export type GetMyTypeQueryVariables = {
  id: string,
};

export type GetMyTypeQuery = {
  getMyType:  {
    __typename: "MyType",
    id: string,
    title: string,
    content: string,
    price: number | null,
    rating: number | null,
  } | null,
};

export type ListMyTypesQueryVariables = {
  filter?: ModelMyTypeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMyTypesQuery = {
  listMyTypes:  {
    __typename: "ModelMyTypeConnection",
    items:  Array< {
      __typename: "MyType",
      id: string,
      title: string,
      content: string,
      price: number | null,
      rating: number | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateMyTypeSubscription = {
  onCreateMyType:  {
    __typename: "MyType",
    id: string,
    title: string,
    content: string,
    price: number | null,
    rating: number | null,
  } | null,
};

export type OnUpdateMyTypeSubscription = {
  onUpdateMyType:  {
    __typename: "MyType",
    id: string,
    title: string,
    content: string,
    price: number | null,
    rating: number | null,
  } | null,
};

export type OnDeleteMyTypeSubscription = {
  onDeleteMyType:  {
    __typename: "MyType",
    id: string,
    title: string,
    content: string,
    price: number | null,
    rating: number | null,
  } | null,
};
