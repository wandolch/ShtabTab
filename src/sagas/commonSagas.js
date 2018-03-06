import { call, put, takeLatest } from 'redux-saga/effects';
import CommonRepository from '../repositories/CommonRepository';
import { actionTypes } from '../constants/actionTypes';
import { signInSuccess, applicationError } from '../actions/commonActions';

function* signInAndFetchUser(action) {
  try {
    const res = yield call(CommonRepository.signIn, action.payload);
    yield put(signInSuccess(res));
  } catch (e) {
    yield put(applicationError(e));
  }
}

export function* signInSaga() {
  yield takeLatest(actionTypes.SIGN_IN, signInAndFetchUser);
}
