import React from 'react';
import axios from 'axios';

import Counter from './Counter';

export const dataReducer = (state, action) => {
  const { type, list } = action;
  if (type === 'SET_ERROR') {
    return { ...state, list: [], error: true };
  }

  if (type === 'SET_LIST') {
    return { ...state, list, error: null };
  }

  throw new Error();
};

const initialData = {
  list: [],
  error: null
};

const App = () => {
  const [count, setCount] = React.useState(0);
  const [data, dispatch] = React.useReducer(dataReducer, initialData);

  React.useEffect(() => {
    axios
      .get('http://hn.algolia.com/api/v1/search?query=react')
      .then(response => {
        dispatch({ type: 'SET_LIST', list: response.data.hits });
      })
      .catch(() => {
        dispatch({ type: 'SET_ERROR' });
      });
  }, []);

  return (
    <div>
      <h1>My Counter</h1>
      <Counter count={count} />

      <button type="button" onClick={() => setCount(count + 1)}>
        Increment
      </button>

      <button type="button" onClick={() => setCount(count - 1)}>
        Decrement
      </button>

      <h2>My Async Data</h2>
      {data.error && <div className="error">Error</div>}
      <ul>
        {data.list.map(item => (
          <li key={item.objectID}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
