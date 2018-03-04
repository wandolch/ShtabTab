import { actionTypes } from '../constants/actionTypes';
import { commonState } from '../states/commonState';

export default (state = commonState, action) => {
  switch (action.type) {
  case actionTypes.SIGN_IN:
    return Object.assign({}, state, {
      signInLoading: true,
      signInError: false
    });

  case actionTypes.SIGN_IN_SUCCESS:
    if(action.payload){
      debugger;
    }
    localStorage.setItem('st-user', action.payload);
    return Object.assign({}, state, {
      user: action.payload,
      signInLoading: false,
      signInError: false
    });

  case actionTypes.SIGN_IN_ERROR:
    return Object.assign({}, state, {
      signInLoading: false,
      signInError: true
    });

  default:
    return state;
  }
};
