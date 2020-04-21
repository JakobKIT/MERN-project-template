import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from '../../src/actions/authActions';
import {
  USER_LOADED,
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
} from '../../src/constants/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);

describe('async auth actions', () => {
  afterEach(() => {
    mock.reset();
  })

  it('gets a user with USER_LOADED success', () => {
    const mockData = {
      _id: 'mockID',
      userName: 'test',
      email: 'test@example.com',
      createdAt: '1',
      updatedAt: '1'
    };

    mock.onGet('/api/auth/user').replyOnce(200, {
      success: true,
      data: mockData
    });

    const expectedActions = [
      { type: USER_LOADING },
      { type: USER_LOADED,
        payload: mockData
      },
    ]

    const store = mockStore({auth: {
      token: 12345
    }});
    return store.dispatch(actions.loadUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions) 
    })
  })

  it('logs in a user with LOGIN_SUCCESS', () => {
    const email = 'example@example.com';
    const password = '12345';

    const mockData = {
      id: 'mockID',
      userName: 'test',
      email: 'test@example.com',
    };

    mock.onPost('/api/auth').replyOnce(201, {
      success: true,
      token: 'testToken',
      data: mockData
    });

    const expectedActions = [
      { 
        type: LOGIN_SUCCESS,
        payload: {
          token: 'testToken',
          user: mockData
        }
      },
    ];

    const store = mockStore({auth: {
      token: null
    }});

    return store.dispatch(actions.login(email, password)).then(() => {
      expect(store.getActions()).toEqual(expectedActions) 
    });
  })

  it('registers a user with REGISTER_SUCCESS', () => {
    const email = 'example@example.com';
    const userName = 'TestUser';
    const password = '12345';

    const mockData = {
      id: 'mockID',
      userName: 'TestUser',
      email: 'example@example.com',
    };

    mock.onPost('/api/auth/register').replyOnce(201, {
      success: true,
      token: 'testToken',
      data: mockData
    });

    const expectedActions = [
      { 
        type: REGISTER_SUCCESS,
        payload: {
          token: 'testToken',
          user: mockData
        }
      },
    ];

    const store = mockStore({auth: {
      token: null
    }});

    return store.dispatch(actions.register(email, userName, password, password)).then(() => {
      expect(store.getActions()).toEqual(expectedActions) 
    });
  })  

  it('sets the USER_LOADING', () => {
    const expectedAction = {
      type: USER_LOADING
    }
    expect(actions.setUserLoading()).toEqual(expectedAction);
  })
})