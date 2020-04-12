import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware, routerActions } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import createRootReducer from '../reducers';

const history = createHashHistory();

const rootReducer = createRootReducer(history);

const configureStore = (initialState) => {
  // Store all middleware in this array
  const middleware = [];
  // Same goes for enhancers
  const enhancers = [];

  // Add thunk to the array
  middleware.push(thunk);

  // Configure logger
  const logger = createLogger({
    level: 'info',
    collapsed: true,
  });

  // Configure Router middleware and add it to the array
  const router = routerMiddleware(history);
  middleware.push(router);

  // Redux DevTools Configuration
  const actionCreators = {
    ...routerActions,
  };
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  // eslint-disable
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        actionCreators
      })
    : compose;

  // Add logger as the last middleware See here: https://www.npmjs.com/package/redux-logger
  middleware.push(logger);

  // Apply middleware and compose enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  // Finally create the store
  const store = createStore(rootReducer, initialState, enhancer);

  return store;
}

export default { configureStore, history };
