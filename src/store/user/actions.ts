import { Action, State, ACTION_TYPES } from "./interfaces";

export const useActions = (_state: State, dispatch: React.Dispatch<Action>) => {
  return {
    login: (data: boolean) => {
      dispatch({
        type: ACTION_TYPES.USER_LOGIN,
        data
      });
    }
  };
};
