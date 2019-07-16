import { GET_ARTICLE } from '../constant';

export default (state = { items: [] }, action) => {
  switch (action.type) {
    case GET_ARTICLE.REQUEST:
      return state;
    case GET_ARTICLE.SUCCESS: {
      const { payload = [] } = action;
      return {
        items: [...state.items, ...payload]
      };
    }
    default:
      return state;
  }
};
