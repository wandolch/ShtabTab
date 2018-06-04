import { all, fork } from 'redux-saga/effects';
import {
  addBookmarkSaga, addCollectionSaga, bookmarksSaga, collectionsSaga, deleteBookmarkSaga, deleteCollectionSaga,
  editCollectionSaga,
  getFilteredBookmarksSaga,
  getTopicsSaga, sendStatSaga,
  shareCollectionSaga, toggleCollectionViewSaga
} from './bookmarksSagas';
import { signInSaga } from './commonSagas';

export default function* root() {
  yield all([
    fork(bookmarksSaga),
    fork(signInSaga),
    fork(collectionsSaga),
    fork(addBookmarkSaga),
    fork(deleteBookmarkSaga),
    fork(addCollectionSaga),
    fork(shareCollectionSaga),
    fork(editCollectionSaga),
    fork(deleteCollectionSaga),
    fork(toggleCollectionViewSaga),
    fork(getTopicsSaga),
    fork(getFilteredBookmarksSaga),
    fork(sendStatSaga)
  ]);
}
