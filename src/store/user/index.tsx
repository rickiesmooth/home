import React from "react";
import { reducer, initialState } from "./reducers";
import { useActions } from "./actions";
import { UserContextInterface } from "./interfaces";

const UserContext = React.createContext<UserContextInterface>(
  {} as UserContextInterface
);

const UserProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const actions = useActions(state, dispatch);

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
