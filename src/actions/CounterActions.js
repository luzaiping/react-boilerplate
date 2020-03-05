import { createActionCreator } from '../utils/actionUtil';
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../constant/ActionTypes';

export const incrementCounter = createActionCreator(INCREMENT_COUNTER);
export const decrementCounter = createActionCreator(DECREMENT_COUNTER);
