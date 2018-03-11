import { actionTypes } from '../constants/actionTypes';
import { commonState } from '../states/commonState';

export default (state = commonState, action) => {
  switch (action.type) {
  case actionTypes.SIGN_IN:
    return Object.assign({}, state, {
      signInLoading: true
    });

  case actionTypes.SIGN_IN_SUCCESS:
    return Object.assign({}, state, {
      user: action.payload,
      signInLoading: false
    });

  case actionTypes.SIGN_IN_ERROR:
    return Object.assign({}, state, {
      signInLoading: false
    });

  case actionTypes.APP_ERROR:
    return Object.assign({}, state, {
      appError: action.payload
    });

  default:
    return state;
  }
};
