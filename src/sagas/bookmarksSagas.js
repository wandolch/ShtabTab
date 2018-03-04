import { call, put, takeLatest } from 'redux-saga/effects';
import BookmarksRepository from '../repositories/BookmarksRepository';
import { actionTypes } from '../constants/actionTypes';
import {
  bookmarksFetched, bookmarksFetchingError, collectionsFetched,
  collectionsFetchingError
} from '../actions/bookmarksActions';

function* fetchBookmarksByCollectionId(action) {
  try {
    const res = yield call(BookmarksRepository.fetchBookmarksByCollectionId, action.payload);
    yield put(bookmarksFetched(res.data));
  } catch (e) {
    yield put(bookmarksFetchingError(e));
  }
}

export function* bookmarksSaga() {
  yield takeLatest(actionTypes.FETCH_BOOKMARKS, fetchBookmarksByCollectionId);
}

function* fetchCollections() {
  try {
    const res = yield call(BookmarksRepository.fetchCollections);
    yield put(collectionsFetched(res.data));
  } catch (e) {
    yield put(collectionsFetchingError(e));
  }
}

export function* collectionsSaga() {
  yield takeLatest(actionTypes.FETCH_COLLECTIONS, fetchCollections);
}
