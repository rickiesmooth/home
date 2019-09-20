import { Action, State, ACTION_TYPES } from "./interfaces";
import API from "../../utils/api";
export const useActions = (_state: State, dispatch: React.Dispatch<Action>) => {
  return {
    login: (data: string) => {
      API.jwt = data;
      dispatch({
        type: ACTION_TYPES.USER_LOGIN,
        data
      });
    }
  };
};
