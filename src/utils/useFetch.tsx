import { useFetch as useAsyncFetch } from "react-async";
import API, { GATEWAY_URL } from "./api";

export const useFetch: typeof useAsyncFetch = (path, init = {}, options) =>
  useAsyncFetch(
    `${GATEWAY_URL}${path}`,
    {
      headers: {
        ...API.headers,
        ...init.headers
      },
      ...init
    },
    options
  );
