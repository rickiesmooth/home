import { useFetch as useAsyncFetch } from "react-async";
import API, { GATEWAY_URL } from "./api";

export const useFetch: typeof useAsyncFetch = (path, init = {}, options) => {
  return useAsyncFetch(
    `${GATEWAY_URL}${path}`,
    {
      ...init,
      headers: {
        ...init.headers,
        ...API.headers()
      }
    },
    options
  );
};
