// useToogle 切换
import { useState, useMemo } from 'react';

export interface Action<T> {
  setLeft: () => void;
  setRight: () => void;
  set: (value: T) => void;
  toggle: () => void;
}

function useToogle<T = boolean>(): [boolean, Action<T>];
function useToogle<T>(defaultValue: T): [boolean, Action<T>];
function useToogle<T, U>(defaultValue: T, reverseValue: U): [T | U, Action<T | U>];

function useToogle<D, R>(defaultValue = false as D, reverseValue?: R) {
  const [state, setState] = useState(defaultValue);

  const actions = useMemo(() => {
    const reverseValueOrigin = reverseValue ? reverseValue : !defaultValue;

    const setLeft = () => setState(defaultValue);
    const setRight = () => setState(reverseValueOrigin);
    const set = (value) => setState(value);
    const toggle = () => setState((s) => (s === defaultValue ? reverseValueOrigin : defaultValue));
    return {
      setLeft,
      setRight,
      set,
      toggle,
    };
  }, []);
  return [state, actions];
}

export default useToogle;
