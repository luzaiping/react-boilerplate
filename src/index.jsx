import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Router from './router';
import rootReducer from './reducer';

const store = configureStore(rootReducer);

const App = () => (
  <React.StrictMode>
    <Provider store={store}>
      {/* <ErrorBoundary> */}
      <Router />
      {/* </ErrorBoundary> */}
    </Provider>
  </React.StrictMode>
);

const Index = IS_DEVELOPMENT ? hot(App) : App;

ReactDOM.render(<Index />, document.getElementById('root'));
