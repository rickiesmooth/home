import React from "react";
import { Action, ACTION_TYPES, Thing, ThingProperties } from "./interfaces";
import { doFetch } from "../utils/useFetch";

export const thingsMiddleware = (dispatch: React.Dispatch<Action>) => async (
  action: Action
) => {
  dispatch(action);

  switch (action.type) {
    case ACTION_TYPES.THINGS_FETCH:
      dispatch({
        type: ACTION_TYPES.THINGS_FETCH,
        data: await doFetch<Thing[]>("/things")
      });
      break;
    case ACTION_TYPES.PROPERTIES_FETCH:
      dispatch({
        type: ACTION_TYPES.PROPERTIES_FETCH,
        data: await doFetch<ThingProperties>(`${action.href}/properties`),
        href: action.href
      });
      break;
    case ACTION_TYPES.PROPERTIES_UPDATE:
      await doFetch<ThingProperties>(`${action.href}/properties/on`, {
        method: "PUT",
        body: JSON.stringify({
          on: action.data.on
        })
      });
      break;
    default:
      break;
  }
};
