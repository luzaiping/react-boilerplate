import React from 'react';
import { useSelector } from 'react-redux';
import useActions from '../../hooks/useActions';
import * as counterActions from '../../actions/CounterActions';

const Home = () => {
  const count = useSelector(state => state.counter.count);
  const { incrementCounter, decrementCounter } = useActions(counterActions);

  return (
    <div>
      <div> counter: {count} </div>
      <button type="button" onClick={incrementCounter}>
        increment
      </button>
      <button type="button" onClick={decrementCounter}>
        decrement
      </button>
    </div>
  );
};

export default React.memo(Home);
