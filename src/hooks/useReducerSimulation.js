/**
 * react useReducer 的一种实现方式
 */
import { useState } from 'react';

export default function useReducer(reducer, initState) {
  const [state, setState] = useState(initState);

  function dispatch(action) {
    const nextState = reducer(action);
    setState(nextState);
  }

  return [state, dispatch];
}
