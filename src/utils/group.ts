import { mergeAll, pluck } from "ramda";

export const group = <T, K extends keyof T>(things: T[], key: K): T[K] =>
  // @ts-ignore
  mergeAll(pluck(key, things));
