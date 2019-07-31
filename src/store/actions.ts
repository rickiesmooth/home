import {
  Action,
  State,
  ThingRaw,
  ACTION_TYPES,
  ThingModel,
  ThingModelValues
} from "./interfaces";
import { Thing } from "./models";
import { doFetch } from "../utils/useFetch";

export const useActions = (
  _state: State,
  dispatch: React.Dispatch<Action>
) => ({
  initThings: async () => {
    const { result, error, loading } = await doFetch<ThingRaw[]>("/things");
    const normalized = result!.map(raw => new Thing(raw));

    dispatch({
      type: ACTION_TYPES.THINGS_INIT,
      data: {
        error,
        loading,
        result: normalized
      }
    });

    if (loading || error) return;

    normalized.forEach(thing => {
      thing.fetchValues().then(({ result }) => {
        dispatch({
          type: ACTION_TYPES.PROPERTIES_UPDATE,
          data: {
            // @TODO add loading and error to thingmodel
            ...thing,
            values: result || thing.values
          }
        });
      });
    });
  },
  // @TODO maybe in thing provider
  updateThing: async (thing: ThingModel, value: Partial<ThingModelValues>) => {
    thing.updateValue(value);
    dispatch({
      type: ACTION_TYPES.PROPERTIES_UPDATE,
      data: {
        ...thing,
        values: {
          ...thing.values,
          ...value
        }
      }
    });
    return;
  }
});
