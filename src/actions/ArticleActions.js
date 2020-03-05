import { createActionCreator } from '../utils/actionUtil';
import request from '../service/baseService';
import { GET_ARTICLE, PAYLOAD } from '../constant';

const getDataRequestActionCreator = createActionCreator(
  GET_ARTICLE.REQUEST,
  PAYLOAD
);
const getDataSuccessActionCreator = createActionCreator(
  GET_ARTICLE.SUCCESS,
  PAYLOAD
);

// 触发异步请求的action
const getArticleActionCreator = param => dispatch => {
  dispatch(getDataRequestActionCreator());
  const { query } = param;
  return request(`http://hn.algolia.com/api/v1/search_by_date?query=${query}`)
    .then(response => {
      dispatch(getDataSuccessActionCreator(response.hits));
    })
    .catch(err => {
      console.error('get data error:', err);
    });
};

export default {
  getArticleActionCreator
};
