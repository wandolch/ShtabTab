import { all, fork } from 'redux-saga/effects';
import { bookmarkSaga } from './bookmarksSagas';

export default function* root() {
  yield all([
    fork(bookmarkSaga)
  ]);
}
