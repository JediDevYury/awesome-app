import { useRef, useEffect, EffectCallback, DependencyList } from 'react';

export const useEffectOnlyOnUpdate = (callback: EffectCallback, dependencies: DependencyList) => {
  const didMount = useRef(true);

  useEffect(() => {
    if (didMount.current) {
      didMount.current = false;
      return;
    }

    // eslint-disable-next-line consistent-return
    return callback();
  }, dependencies);
};
