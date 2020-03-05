import React, { useCallback } from 'react';
import useShallowEqualSelector from '../../hooks/useShallowEqualSelector';
import * as articleActions from '../../actions/ArticleActions';
import useActions from '../../hooks/useActions';

const Article = () => {
  const items = useShallowEqualSelector(state => state.users.items);
  const { getArticleAsync } = useActions(articleActions);

  const getData = useCallback(
    query => {
      getArticleAsync({ query });
    },
    [getArticleAsync]
  );

  const displayData = () => {
    const elems = items.map(({ title, author, objectID }) => (
      <li key={objectID}>
        {title} - {author}
      </li>
    ));
    return <ul>{elems}</ul>;
  };

  return items.length > 0 ? (
    displayData()
  ) : (
    <div onClick={() => getData('react')}>click to get Data</div>
  );
};

export default React.memo(Article);
