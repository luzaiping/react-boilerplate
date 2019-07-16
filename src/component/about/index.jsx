import React, { useCallback } from 'react';
import useShallowEqualSelector from '../../hooks/useShallowEqualSelector';
import counterActionCreator from '../../actionCreator/counterAction';
import useActions from '../../hooks/useActions';

const About = () => {
  const items = useShallowEqualSelector(state => state.users.items);
  const { getDataActionCreator } = useActions(counterActionCreator);

  const getData = useCallback((query) => {
    getDataActionCreator({ query });
  }, [getDataActionCreator]);

  const displayData = () => {
    const elems = items.map(({ title, author, objectID }) => (
      <li key={objectID}>
        {title} - {author}
      </li>
    ));
    return <ul>{elems}</ul>;
  };

  return items.length ? displayData() : <div onClick={() => getData('react')}>getData</div>;
};

export default React.memo(About);
