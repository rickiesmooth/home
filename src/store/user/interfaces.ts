export interface UserContextInterface {
  state: State;
  actions: UserActions;
}
export type State = {
  loggedIn: boolean;
  token?: string;
};

export enum ACTION_TYPES {
  USER_LOGIN = "USER_LOGIN"
}

export type Action = {
  type: ACTION_TYPES.USER_LOGIN;
  data: string;
};

export type UserActions = {
  login(token: string): void;
};
