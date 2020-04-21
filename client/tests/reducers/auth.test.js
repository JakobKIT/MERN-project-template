import reducer from '../../src/reducers/authReducer';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from '../../src/constants/types';

describe('auth Reducer', () => {
  it('should return the intial state', () => {
    expect(
      reducer(undefined, {}),
    ).toEqual(
      {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        isLoading: false,
        user: null,
      },
    );
  });

  it('should handle USER_LOADING', () => {
    expect(
      reducer(undefined, {
        type: USER_LOADING,
      }),
    ).toEqual(
      {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        isLoading: true,
        user: null,
      },
    );
  });

  it('should handle USER_LOADED', () => {
    expect(
      reducer(undefined, {
        type: USER_LOADED,
        payload: 'Test user',
      }),
    ).toEqual(
      {
        token: localStorage.getItem('token'),
        isAuthenticated: true,
        isLoading: false,
        user: 'Test user',
      },
    );
  });

  it('should handle LOGIN_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: LOGIN_SUCCESS,
        payload: {
          token: '12345',
          user: 'Test user',
        },
      }),
    ).toEqual(
      {
        token: localStorage.getItem('token'),
        isAuthenticated: true,
        isLoading: false,
        user: 'Test user',
      },
    );
  });

  it('should handle REGISTER_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: REGISTER_SUCCESS,
        payload: {
          token: '12345',
          user: 'Test user',
        },
      }),
    ).toEqual(
      {
        token: localStorage.getItem('token'),
        isAuthenticated: true,
        isLoading: false,
        user: 'Test user',
      },
    );
  });

  it('should handle AUTH_ERROR', () => {
    expect(
      reducer(undefined, {
        type: AUTH_ERROR,
      }),
    ).toEqual(
      {
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
      },
    );
  });

  it('should handle LOGIN_FAIL', () => {
    expect(
      reducer(undefined, {
        type: LOGIN_FAIL,
      }),
    ).toEqual(
      {
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
      },
    );
  });

  it('should handle LOGOUT_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: LOGOUT_SUCCESS,
      }),
    ).toEqual(
      {
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
      },
    );
  });

  it('should handle REGISTER_FAIL', () => {
    expect(
      reducer(undefined, {
        type: REGISTER_FAIL,
      }),
    ).toEqual(
      {
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
      },
    );
  });
});
