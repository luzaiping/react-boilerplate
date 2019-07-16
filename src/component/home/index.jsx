import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import counterActionCreator from '../../actionCreator/counterAction';

const Home = () => {
  const count = useSelector(state => state.counter.count);
  const dispatch = useDispatch();
  const { incrementActionCreator, decrementActionCreator } = counterActionCreator;

  const incrementFn = useCallback(() => {
    dispatch(incrementActionCreator());
  }, [dispatch, incrementActionCreator]);

  const decrementFn = useCallback(() => {
    dispatch(decrementActionCreator());
  }, [dispatch, decrementActionCreator]);

  return (
    <div>
      <div> counter: {count} </div>
      <button type="button" onClick={incrementFn}>increment</button>
      <button type="button" onClick={decrementFn}>decrement</button>
    </div>
  );
};

export default React.memo(Home);
