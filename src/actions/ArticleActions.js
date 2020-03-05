import { createActionCreator } from '../utils/actionUtil';
import request from '../service/baseService';
import { PAYLOAD } from '../constant';
import { GET_ARTICLE } from '../constant/ActionTypes';

const getDataRequest = createActionCreator(GET_ARTICLE.REQUEST);
const getDataSuccess = createActionCreator(GET_ARTICLE.SUCCESS, PAYLOAD);

// 触发异步请求的action
export const getArticleAsync = param => dispatch => {
  dispatch(getDataRequest());
  const { query } = param;
  return request(`http://hn.algolia.com/api/v1/search_by_date?query=${query}`)
    .then(response => {
      dispatch(getDataSuccess(response.hits));
    })
    .catch(err => {
      console.error('get data error:', err);
    });
};
