import React, { createContext, useReducer } from "react";
import { things, initialState } from "./reducers";
import {
  State,
  Action,
  ACTION_TYPES,
  EnhancedActions,
  ThingProperties
} from "./interfaces";
import { thingsMiddleware } from "./middleware";

export const useActions = (
  _state: State,
  dispatch: React.Dispatch<Action>
) => ({
  getThings: () => {
    dispatch({
      type: ACTION_TYPES.THINGS_FETCH,
      data: {
        loading: true
      }
    });
  },
  getThingProperties: (href: string) =>
    dispatch({
      type: ACTION_TYPES.PROPERTIES_FETCH,
      data: {
        loading: true
      },
      href
    }),
  updateThingProperties: (href: string, data: ThingProperties) =>
    dispatch({
      type: ACTION_TYPES.PROPERTIES_UPDATE,
      data,
      href
    })
});

interface AppContextInterface {
  state: State;
  actions: EnhancedActions;
}

const StoreContext = createContext<AppContextInterface>(
  {} as AppContextInterface
);

const StoreProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(things, initialState);

  // Attach middleware to capture every dispatch
  const thingsMiddleWare = thingsMiddleware(dispatch);

  const thingsActions = useActions(state, thingsMiddleWare);

  return (
    <StoreContext.Provider
      value={{
        state,
        actions: thingsActions
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };
