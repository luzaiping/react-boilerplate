import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Router from './router';
import rootReducer from './reducer';
import ErrorBoundary from './errorBoundary';

const store = configureStore(rootReducer);

const App = () => (
  <Provider store={store}>
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  </Provider>
);

/* eslint-disable */
const Index = IS_DEVELOPMENT ? hot(App) : App;
/* eslint-enable */

ReactDOM.render(<Index />, document.getElementById('root'));
