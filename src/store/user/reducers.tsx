import { State, Action, ACTION_TYPES } from "./interfaces";

export const initialState: State = {
  loggedIn: null,
  id: "",
  username: "",
  hubToken: ""
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTION_TYPES.USER_LOGIN:
      return {
        ...state,
        loggedIn: !!action.data,
        id: action.data.id,
        hubToken: action.data.hubToken
      };

    default:
      throw new Error();
  }
};
