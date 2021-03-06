import { Action, State, ACTION_TYPES, ThingModel } from "./interfaces";
import { Thing } from "./models";
import API from "../../utils/api";

export const useActions = (_state: State, dispatch: React.Dispatch<Action>) => {
  const updateThing = (updatedThing: ThingModel) => {
    dispatch({
      type: ACTION_TYPES.PROPERTIES_UPDATE,
      data: {
        ...updatedThing
      }
    });
  };

  return {
    login: (data: boolean) => {
      dispatch({
        type: ACTION_TYPES.USER_LOGIN,
        data
      });
    },
    initThings: async function() {
      const { data, error } = await API.things();

      dispatch({
        type: ACTION_TYPES.THINGS_INIT,
        data: {
          ...(data && {
            things: data.map(raw => new Thing(raw, updateThing))
          }),
          ...(error && { error: error.message })
        }
      });
    },
    updateThing
  };
};
