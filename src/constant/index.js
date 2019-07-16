import { createAsyncActionType } from '../actionCreator/actionUtil';

export const PAYLOAD = 'payload';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const GET_DATA = createAsyncActionType('GET_DATA');
