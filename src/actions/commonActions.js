import { actionTypes } from '../constants/actionTypes';

export function doSignIn(token) {
  return {
    type: actionTypes.SIGN_IN,
    payload: token
  };
}

export function signInSuccess(user) {
  return {
    type: actionTypes.SIGN_IN_SUCCESS,
    payload: user
  };
}

export function signInError(error) {
  return {
    type: actionTypes.SIGN_IN_ERROR,
    payload: error
  };
}


