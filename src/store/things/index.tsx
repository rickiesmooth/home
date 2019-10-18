import React from "react";
import { reducer, initialState } from "./reducers";
import { ThingsContextInterface } from "./interfaces";
import { useActions } from "./actions";

const ThingsContext = React.createContext<ThingsContextInterface>(
  {} as ThingsContextInterface
);

const ThingsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const actions = useActions(state, dispatch);

  return (
    <ThingsContext.Provider
      value={{
        state,
        actions
      }}
    >
      {children}
    </ThingsContext.Provider>
  );
};

export { ThingsContext, ThingsProvider };
