import { State, Action, ACTION_TYPES } from "./interfaces";

export const initialState: State = {
  things: {
    loading: false,
    result: []
  },
  properties: {}
};

export const things = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTION_TYPES.THINGS_FETCH:
      return {
        ...state,
        things: {
          ...state.things,
          ...action.data
        }
      };
    case ACTION_TYPES.PROPERTIES_FETCH:
      return {
        ...state,
        properties: {
          ...state.properties,
          [`${action.href}`]: action.data
        }
      };
    case ACTION_TYPES.PROPERTIES_UPDATE:
      const currentProperties = state.properties;
      const targetProperty = currentProperties[action.href];

      return {
        ...state,
        properties: {
          ...currentProperties,
          [`${action.href}`]: {
            ...targetProperty,
            result: {
              ...targetProperty.result,
              ...action.data
            }
          }
        }
      };
    default:
      throw new Error();
  }
};
