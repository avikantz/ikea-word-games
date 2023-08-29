import { DependencyList, EffectCallback, useEffect } from "react";

export const useEffectTimeout = (effect: EffectCallback, deps?: DependencyList, timeout?: number) => {
  useEffect(() => {
    const id = setTimeout(effect, timeout);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
