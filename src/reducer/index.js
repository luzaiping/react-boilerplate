import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';
import counter from './counter';
import users from './users';
// import { i18nConfig } from 'config'

const root = {
  counter,
  users
};

export default combineReducers(root);
