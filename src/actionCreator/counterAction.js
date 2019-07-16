import { createActionCreator } from './actionUtil';
import { INCREMENT, DECREMENT } from '../constant';

const incrementActionCreator = createActionCreator(INCREMENT);
const decrementActionCreator = createActionCreator(DECREMENT);

export default {
  incrementActionCreator,
  decrementActionCreator
};
