import { Action, State, ACTION_TYPES } from "./interfaces";
import API from "../../utils/api";
import { User } from "./models";
import { GetUserQuery } from "../../graphql/API";

export const useActions = (_state: State, dispatch: React.Dispatch<Action>) => {
  return {
    login: (data: GetUserQuery["getUser"]) => {
      const user = new User(data);
      API.jwt = user.hubToken!;
      dispatch({
        type: ACTION_TYPES.USER_LOGIN,
        data: user
      });
    }
  };
};
