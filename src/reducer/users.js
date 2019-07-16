import { GET_DATA } from '../constant';

export default (state = { items: [] }, action) => {
  switch (action.type) {
    case GET_DATA.REQUEST:
      return state;
    case GET_DATA.SUCCESS: {
      const { payload = [] } = action;
      return {
        items: [...state.items, ...payload]
      };
    }
    default:
      return state;
  }
};
