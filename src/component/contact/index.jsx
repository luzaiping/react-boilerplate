import React, { useState, useEffect, useCallback } from 'react';
import styles from './contact.css';

const Contact = () => {
  const [count, setCount] = useState(0);

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
      <button onClick={incrementFn} type="button">
        Increment
      </button>
      <button onClick={decrementFn} type="button">
        Decrement
      </button>
    </div>
  );
};

export default React.memo(Contact);
