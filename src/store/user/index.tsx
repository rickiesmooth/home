import React from "react";
import { reducer, initialState } from "./reducers";
import { useActions } from "./actions";
import { UserContextInterface } from "./interfaces";
import { AsyncStorage } from "react-native";

const UserContext = React.createContext<UserContextInterface>(
  {} as UserContextInterface
);

const UserProvider: React.FC = ({ children }) => {
  const memoizedReducer = React.useCallback(reducer, []);
  const [state, dispatch] = React.useReducer(memoizedReducer, initialState);

  const actions = useActions(state, dispatch);

  AsyncStorage.getItem("userToken").then(res => {
    if (!state.loggedIn) {
      actions.login(true);
    }
  });

  return (
    <UserContext.Provider
      value={{
        state,
        actions
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
