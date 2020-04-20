import reducer from '../../src/reducers/errorReducer';
import { GET_ERRORS, CLEAR_ERRORS } from '../../src/constants/types';

describe('error Reducer', () => {
  it('should return the intial state', () => {
    expect(
      reducer(undefined, {})).toEqual(
      {
        msg: {},
        status: null,
        id: null
      }
    )
  })

  it('should handle GET_ERRORS', () => {
    expect(
      reducer(undefined, {
        type: GET_ERRORS,
        payload: {
          msg: 'Test Message',
          status: 200,
          id: 1
        }
      })
    ).toEqual(
      {
        msg: 'Test Message',
        status: 200,
        id: 1
      }
    )
  })

  it('should handle CLEAR_ERRORS', () => {
    expect(
      reducer(undefined, {
        type: CLEAR_ERRORS
      })
    ).toEqual(
      {
        msg: {},
        status: null,
        id: null
      }
    )
  })

})