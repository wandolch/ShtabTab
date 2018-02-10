import { all, fork } from 'redux-saga/effects';
import { bookmarksSaga, collectionsSaga } from './bookmarksSagas';

export default function* root() {
  yield all([
    fork(bookmarksSaga),
    fork(collectionsSaga)
  ]);
}
