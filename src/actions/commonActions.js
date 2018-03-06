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

export function applicationError(error) {
  return {
    type: actionTypes.APP_ERROR,
    payload: error
  };
}

