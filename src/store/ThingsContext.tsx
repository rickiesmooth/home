import React, { createContext, useReducer } from "react";
import { reducer, initialState } from "./reducers";
import { ThingsContextInterface } from "./interfaces";
import { useActions } from "./actions";

const ThingsContext = createContext<ThingsContextInterface>(
  {} as ThingsContextInterface
);

const ThingsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
