export function throttle(fn: Function, wait: number) {
  let isCalled = false;

  return function(...args: unknown[]) {
    if (!isCalled) {
      fn(...args);
      isCalled = true;
      setTimeout(function() {
        isCalled = false;
      }, wait);
    }
  };
}
