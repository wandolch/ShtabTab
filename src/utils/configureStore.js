import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import reducers from '../reducers';
import initialState from '../states/';

export default function configureStore(history) {
  const middlewares = [
    thunk,
    routerMiddleware(history)
  ];

  const enhancers = [
    applyMiddleware(...middlewares)
  ];

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false
      })
      : compose;
  /* eslint-enable */

  return createStore(
    reducers,
    initialState,
    composeEnhancers(...enhancers)
  );
}
