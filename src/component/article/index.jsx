import React, { useCallback } from 'react';
import useShallowEqualSelector from '../../hooks/useShallowEqualSelector';
import articleActions from '../../actions/ArticleActions';
import useActions from '../../hooks/useActions';

const Article = () => {
  const items = useShallowEqualSelector(state => state.users.items);
  const { getArticleActionCreator } = useActions(articleActions);
  const getData = useCallback(
    query => {
      getArticleActionCreator({ query });
    },
    [getArticleActionCreator]
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
    <div onClick={() => getData('react')}>getData</div>
  );
};

export default React.memo(Article);
