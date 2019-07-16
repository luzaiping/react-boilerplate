import { createAsyncActionType } from '../utils/actionUtil';

export const PAYLOAD = 'payload';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const GET_ARTICLE = createAsyncActionType('GET_ARTICLE');
