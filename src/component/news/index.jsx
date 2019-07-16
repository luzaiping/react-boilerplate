import React, { useState, useCallback } from 'react';
import useFetchApi from '../../hooks/useFetchApi';

const BASE_URL = 'http://hn.algolia.com/api/v1/search?query=';

const News = () => {
  const [query, setQuery] = useState('redux');
  const [result = {}, setUrl] = useFetchApi({ hits: [] }, `${BASE_URL}redux`);
  const { data, isLoading, hasError } = result;

  const submitFn = useCallback((event) => {
    event.preventDefault();
    setUrl(`${BASE_URL}${query}`);
  }, [setUrl, query]);

  return (
    <>
      <form onSubmit={submitFn}>
        <input type="text" value={query} onChange={event => setQuery(event.target.value)} />
        <button type="submit">Search</button>
      </form>
      { hasError && <div>Something went wrong...</div> }
      {
        isLoading ? (
          <div>Loading...</div>
        ) : (
          <ul>
            { data.hits.map(item => (
              <li key={item.objectID}>
                <a href={item.url}>{item.title}</a>
              </li>
            ))}
          </ul>
        )
      }
    </>
  );
};

export default React.memo(News);
