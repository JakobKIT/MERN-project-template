import * as actions from '../../actions/errorActions';
import { GET_ERRORS, CLEAR_ERRORS } from '../../constants/types';

describe('error actions', () => {
  it('should create an action to return errors', () => {
    const msg = 'test msg';
    const status = 500;
    const id = 1;

    const expectedAction = {
      type: GET_ERRORS,
      payload: {
        msg,
        status,
        id
      }
    };
    expect(actions.returnErrors(msg, status, id)).toEqual(expectedAction);
  })

  it('should create an action to clear errors', () => {
    const expectedAction = {
      type: CLEAR_ERRORS
    };
    expect(actions.clearErrors()).toEqual(expectedAction);
  })
  
})