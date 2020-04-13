import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../constants/types';

// Check for token and load user
export const loadUser = () => async (dispatch, getState) => {
  try {
    dispatch(setUserLoading());

    const res = await axios.get('/api/auth', headerConfig(getState));

    dispatch({
      type: USER_LOADED,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch(
      returnErrors(
        err.response.data.error,
        err.response.status,
        )
      );
    dispatch({
      type:AUTH_ERROR
    });
  }
};

// Login a user
export const login = ({ email, userName, password }) => async (dispatch, getState) => {
  try {
    
    const body = JSON.stringify({
      email,
      userName,
      password
    });

    const res = await axios.post('/api/auth', body, headerConfig(getState));

    const payload = {
      token: res.data.token,
      user: res.data.data
    };

    dispatch({
      type: LOGIN_SUCCESS,
      payload: payload
    });
  } catch (err) {
    dispatch(
      returnErrors(
        err.response.data.error,
        err.response.status,
        'LOGIN_FAIL'
        )
      );
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const register = ({
  userName,
  email,
  password,
  password2
}) => async (dispatch, getState) => {
  try {
    const body = JSON.stringify({
      userName,
      email,
      password,
      password2
    });

    const res = await axios.post('/api/auth/register', body, headerConfig(getState));
    const payload = {
      token: res.data.token,
      user: res.data.data,
    };

    dispatch({
      type: REGISTER_SUCCESS,
      payload: payload,
    });
  } catch (err) {
    dispatch(
      returnErrors(
        err.response.data.error,
        err.response.status,
        'REGISTER_FAIL'
        )
      );
    dispatch({
      type: REGISTER_FAIL
    });
  }
}

/*
  HELPER METHODS
*/

export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  }
};

export const headerConfig = (getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config
}