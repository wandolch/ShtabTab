import { call, put, takeLatest } from 'redux-saga/effects';
import BookmarksRepository from '../repositories/BookmarksRepository';
import { actionTypes } from '../constants/actionTypes';
import { bookmarksFetched, bookmarksFetchingError } from '../actions/bookmarksActions';

export function* fetchBookmarksByCollectionId(action) {
  try {
    const bookmarksRes = yield call(BookmarksRepository.fetchBookmarksByCollectionId, action.payload);
    yield put(bookmarksFetched(bookmarksRes.data));
  } catch (e) {
    yield put(bookmarksFetchingError(e));
  }
}

export function* bookmarkSaga() {
  yield takeLatest(actionTypes.FETCH_BOOKMARKS, fetchBookmarksByCollectionId);
}
