import { State, Action, ACTION_TYPES } from "./interfaces";

export const initialState: State = {
  loggedIn: false
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTION_TYPES.USER_LOGIN:
      return {
        ...state,
        loggedIn: action.data
      };

    default:
      throw new Error();
  }
};
