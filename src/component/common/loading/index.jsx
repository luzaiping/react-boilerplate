import React from 'react';
import PropTypes from 'prop-types';

const Loading = (props) => {
  const { error, pastDelay } = props;
  if (error) {
    return <p>网络异常，请重试</p>;
  }
  if (pastDelay) {
    return <p>Loading...</p>;
    // return <Spinner /> // TODO
  }
  return null;
};

Loading.propTypes = {
  error: PropTypes.func,
  pastDelay: PropTypes.number
};

export default React.memo(Loading);
