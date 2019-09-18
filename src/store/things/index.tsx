import React from "react";
import { reducer, initialState } from "./reducers";
import { ThingsContextInterface } from "./interfaces";
import { useActions } from "./actions";

const ThingsContext = React.createContext<ThingsContextInterface>(
  {} as ThingsContextInterface
);

const ThingsProvider: React.FC = ({ children }) => {
  const memoizedReducer = React.useCallback(reducer, []);
  const [state, dispatch] = React.useReducer(memoizedReducer, initialState);

  const actions = useActions(state, dispatch);

  const init = React.useCallback(actions.initThings, [actions]);

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