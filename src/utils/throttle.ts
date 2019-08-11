import { apply } from "ramda";

export const debounce = <T>(timeMs: number, fn: (args: T) => void) => {
  let timeout: NodeJS.Timeout | undefined;

  return function(...args: unknown[]) {
    const later = () => {
      timeout = undefined;
      apply(fn, args);
    };
    clearTimeout(timeout as NodeJS.Timeout);
    timeout = setTimeout(later, timeMs);

    return timeout;
  };
};

export function throttle(fn: (args: unknown) => void, ms: number) {
  let wait = false;

  return function(...args: unknown[]) {
    if (!wait) {
      apply(fn, args);
      wait = true;
      setTimeout(() => {
        wait = false;
      }, ms);
    }
  };
}
