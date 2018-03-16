import { actionTypes } from '../constants/actionTypes';

export function doSignIn(token) {
  return {
    type: actionTypes.SIGN_IN,
    payload: token
  };
}

export function setUser(user) {
  return {
    type: actionTypes.SET_USER,
    payload: user
  };
}

export function signInError() {
  return {
    type: actionTypes.SIGN_IN_ERROR
  };
}

export function applicationError(error) {
  return {
    type: actionTypes.APP_ERROR,
    payload: error
  };
}

