import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App/';
import configureStore from './utils/configureStore';
import './global.css';
import rootSaga from './sagas';

const history = createHistory();
const store = configureStore(history);
store.runSaga(rootSaga);
const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>),
  MOUNT_NODE
);

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
