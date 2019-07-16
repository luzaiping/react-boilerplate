import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

export default function configureStore(rootReducer, preloadedState) {
  const composeFn = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancers = composeFn(applyMiddleware(reduxThunk));
  const store = createStore(rootReducer, preloadedState, enhancers);
  return store;
}
