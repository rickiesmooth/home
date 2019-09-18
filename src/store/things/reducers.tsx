import { State, Action, ACTION_TYPES, ThingModel } from "./interfaces";

export const initialState: State = {
  loading: true,
  things: [],
  error: null
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
      const { things } = action.data;
      console.log(action);
      return {
        ...state,
        things: [...(things || [])],
        loading: false
      };

    case ACTION_TYPES.PROPERTIES_UPDATE:
      return {
        ...state,
        things: updateProperty(state.things!, action.data)
      };
    default:
      throw new Error();
  }
};
