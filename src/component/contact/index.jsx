import React, { useState, useEffect, useCallback } from 'react';
import useReducer from '../common/hooks/useReducer';
import styles from './contact.css';

const Contact = () => {
  const [count, setCount] = useState(0);

  const [todos, dispatch] = useReducer(todoReducer, []);

  function todoReducer(action) {
    const { type } = action;
    switch (type) {
      case 'add':
        return [...todos, { name: 'felix', age: 10 }];
      default:
        throw new Error('wrong type');
    }
  }

  const incrementFn = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const decrementFn = useCallback(() => {
    setCount(count - 1);
  }, [count]);

  useEffect(() => {
    document.title = `You clicked ${count} times.`;
  });

  return (
    <div>
      <p className={styles.title}> You clicked {count} times </p>
      <button onClick={incrementFn} type="button"> Increment </button>
      <button onClick={decrementFn} type="button"> Decrement </button>
      <ul>
        {todos.map((todo) => {
          const { name, age } = todo;
          return (
            <li key={name + age}>
              {name} - {age}
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={() => dispatch({ type: 'add' })} type="button">Add Todo</button>
      </div>
    </div>
  );
};

export default React.memo(Contact);
