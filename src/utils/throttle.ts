export const throttle = <T extends []>(
  callback: (..._: T) => void,
  wait: number
): ((..._: T) => void) => {
  const next = () => {
    timeout = clearTimeout(timeout as NodeJS.Timeout) as undefined;
    callback(...lastArgs);
  };
  let timeout: NodeJS.Timeout | undefined;
  let lastArgs: T;

  return (...args: T) => {
    lastArgs = args;

    if (timeout === void 0) {
      timeout = setTimeout(next, wait);
    }
  };
};
