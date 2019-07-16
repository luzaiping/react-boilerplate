import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';

export default function useActions(actionCreators, deps = []) {
  const dispatch = useDispatch();
  return useMemo(() => {
    if (Array.isArray(actionCreators)) {
      return actionCreators.map(a => bindActionCreators(a, dispatch));
    }
    return bindActionCreators(actionCreators, dispatch);
    /* eslint-disable */
  }, deps ? [dispatch, ...deps] : [dispatch]);
  /* eslint-enable */
}
