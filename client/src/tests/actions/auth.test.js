import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from '../../actions/authActions';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../../constants/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
axios.defaults.baseURL = 'http://localhost:5000';
const mock = new MockAdapter(axios);

const mockData = {
  _id: 'mockID',
  userName: 'test',
  email: 'test@example.com',
  createdAt: '1',
  updatedAt: '1'
};

describe('async auth actions', () => {
  afterEach(() => {
    mock.reset();
  })

  it('gets a user with USER_LOADED', () => {
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
})