import { createActionCreator } from '../utils/actionUtil';
import request from '../service/baseService';
import { PAYLOAD } from '../constant';
import { GET_ARTICLE } from '../constant/ActionTypes';

const getArticleRequest = createActionCreator(GET_ARTICLE.REQUEST);
const getArticleSuccess = createActionCreator(GET_ARTICLE.SUCCESS, PAYLOAD);

// 触发异步请求的action
export const getArticleAsync = param => dispatch => {
  dispatch(getArticleRequest());
  const { query } = param;
  return request(`http://hn.algolia.com/api/v1/search_by_date?query=${query}`)
    .then(response => {
      dispatch(getArticleSuccess(response.hits));
    })
    .catch(err => {
      console.error('get data error:', err);
    });
};
