/**
 * 这个适合不适用 redux，state 是 component level；
 * 如果 state 要是 global level 要用 redux，再结合 react-redux hooks
 */
import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

const ACTION_TYPE = {
  FETCH_REQUEST: 'FETCH_REQUEST',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAILURE: 'FETCH_FAILURE'
};

function dataFetchReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPE.FETCH_REQUEST:
      return { ...state, isLoading: true, hasError: false };
    case ACTION_TYPE.FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        data: action.payload
      };
    case ACTION_TYPE.FETCH_FAILURE:
      return { ...state, isLoading: false, hasError: true };
    default:
      throw Error();
  }
}

const useFetchApi = (initData, initUrl) => {
  const [url, setUrl] = useState(initUrl);
  // useReducer 是 useState alternative，适合多个state的管理
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    hasError: false,
    data: initData
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        dispatch({ type: ACTION_TYPE.FETCH_REQUEST });
        const result = await axios(url);
        // unmount 就不对状态进行修改
        if (!didCancel)
          dispatch({ type: ACTION_TYPE.FETCH_SUCCESS, payload: result.data });
      } catch (e) {
        if (!didCancel) dispatch({ type: ACTION_TYPE.FETCH_FAILURE }); // unmount 不对状态进行修改
      }
    };
    fetchData();

    return () => {
      didCancel = true;
    }; // didCancel 用于标识 component 是否 unmount
  }, [url]);

  return [state, setUrl];
};

export default useFetchApi;
