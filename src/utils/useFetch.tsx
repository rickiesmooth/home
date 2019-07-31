import { AsyncStorage } from "react-native";

export type FetchData<T> = { loading: boolean; result?: T; error?: string };

const GATEWAY_URL = "https://hotf.mozilla-iot.org";

export async function doFetch<T>(
  input: RequestInfo,
  init: RequestInit = {}
): Promise<FetchData<T>> {
  let result = null;
  let error = null;
  try {
    const userToken = await AsyncStorage.getItem("userToken");
    const res = await fetch(GATEWAY_URL + input, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
        ...init.headers
      },
      ...init
    });

    if (res.ok) {
      result = await res.json();
    } else {
      throw new Error(res.statusText);
    }
  } catch (e) {
    error = e;
  }
  return {
    result,
    error,
    loading: false
  };
}
