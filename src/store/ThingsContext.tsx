import React, { createContext, useReducer } from "react";
import { reducer, initialState } from "./reducers";
import { ThingsContextInterface } from "./interfaces";
import { useActions } from "./actions";
import { AsyncStorage } from "react-native";

const ThingsContext = createContext<ThingsContextInterface>(
  {} as ThingsContextInterface
);

const ThingsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = useActions(state, dispatch);

  React.useMemo(() => {
    if (!state.loggedIn) {
      AsyncStorage.getItem("userToken").then(res => {
        const isLoggedIn = Boolean(res);
        actions.login(isLoggedIn);
        if (isLoggedIn) {
          actions.initThings();
        }
      });
    }
  }, [state.loggedIn, actions]);

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
