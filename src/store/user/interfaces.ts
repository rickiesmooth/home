import { GetUserQuery } from "../../graphql/API";
import { User } from "./models";

export interface UserContextInterface {
  state: State;
  actions: UserActions;
}
export interface State extends User {
  loggedIn: boolean;
}

export enum ACTION_TYPES {
  USER_LOGIN = "USER_LOGIN"
}

export type Action = {
  type: ACTION_TYPES.USER_LOGIN;
  data: User;
};

export type UserActions = {
  login(user: GetUserQuery["getUser"]): void;
};
