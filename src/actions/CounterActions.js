import { createActionCreator } from '../utils/actionUtil';
import { INCREMENT, DECREMENT } from '../constant/ActionTypes';

const incrementCounter = createActionCreator(INCREMENT);
const decrementCounter = createActionCreator(DECREMENT);

export default {
  incrementCounter,
  decrementCounter
};
