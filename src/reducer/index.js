import { combineReducers } from 'redux';
import counter from './counter';
import users from './article';

const root = {
  counter,
  users
};

export default combineReducers(root);
