import { createActionCreator } from './actionUtil';
import request from '../service/baseService';
import {
  GET_DATA,
  PAYLOAD,
  INCREMENT,
  DECREMENT
} from '../constant';

const incrementActionCreator = createActionCreator(INCREMENT);
const decrementActionCreator = createActionCreator(DECREMENT);
const getDataRequestActionCreator = createActionCreator(GET_DATA.REQUEST, PAYLOAD);
const getDataSuccessActionCreator = createActionCreator(GET_DATA.SUCCESS, PAYLOAD);

const getDataActionCreator = param => (dispatch) => {
  dispatch(getDataRequestActionCreator()); // 触发异步请求的action
  const { query } = param;
  return request(`http://hn.algolia.com/api/v1/search_by_date?query=${query}`)
    .then((response) => {
      dispatch(getDataSuccessActionCreator(response.hits));
    })
    .catch((err) => {
      console.error('get data error:', err);
    });
};

export default {
  incrementActionCreator,
  decrementActionCreator,
  getDataActionCreator
};
