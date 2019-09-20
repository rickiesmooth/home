export const group = <T, K extends keyof T>(things: T[], key: K) =>
  things.reduce(
    (prev, next) => ({
      ...prev,
      ...next[key]
    }),
    {} as T[K]
  );
