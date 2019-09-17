export interface UserContextInterface {
  state: State;
  actions: UserActions;
}
export type State = {
  loggedIn: boolean;
};

export enum ACTION_TYPES {
  USER_LOGIN = "USER_LOGIN"
}

export type Action = {
  type: ACTION_TYPES.USER_LOGIN;
  data: boolean;
};

export type UserActions = {
  login(data: boolean): void;
};
