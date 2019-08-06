import {
  Action,
  State,
  ThingRaw,
  ACTION_TYPES,
  ThingModel
} from "./interfaces";
import { Thing } from "./models";
import { doFetch } from "../utils/useFetch";

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
    initThings: async function() {
      const { result, error, loading } = await doFetch<ThingRaw[]>("/things");
      const normalized = result!.map(raw => new Thing(raw, updateThing));

      dispatch({
        type: ACTION_TYPES.THINGS_INIT,
        data: {
          error,
          loading,
          result: normalized
        }
      });
    },
    updateThing
  };
};
