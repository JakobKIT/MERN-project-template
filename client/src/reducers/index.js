import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import auth from './authReducer';
import error from './errorReducer';

export default function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    auth,
    error,
  });
}
