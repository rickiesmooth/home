import { State, Action, ACTION_TYPES, ThingModel } from "./interfaces";

export const initialState: State = {
  things: {
    loading: true,
    result: []
  }
};

const updateProperty = (things: ThingModel[], thing: ThingModel) =>
  things.map(item => {
    if (item.id !== thing.id) {
      return item;
    }
    return thing;
  });

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTION_TYPES.THINGS_INIT:
      const { result, loading, error } = action.data;
      return {
        ...state,
        things: {
          loading,
          error,
          result
        }
      };

    case ACTION_TYPES.PROPERTIES_UPDATE:
      return {
        ...state,
        things: {
          ...state.things,
          result: updateProperty(state.things.result!, action.data)
        }
      };
    default:
      throw new Error();
  }
};
