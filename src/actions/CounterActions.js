import { createActionCreator } from '../utils/actionUtil';
import { INCREMENT, DECREMENT } from '../constant/ActionTypes';

export const incrementCounter = createActionCreator(INCREMENT);
export const decrementCounter = createActionCreator(DECREMENT);
