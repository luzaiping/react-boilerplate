import { createAsyncActionType } from '../utils/actionUtil';

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';
export const GET_ARTICLE = createAsyncActionType('GET_ARTICLE');
