import { actionTypes } from '../constants/actionTypes';

export function fetchBookmarks(id) {
  return {
    type: actionTypes.FETCH_BOOKMARKS,
    payload: id
  };
}

export function bookmarksFetched(bookmarks) {
  return {
    type: actionTypes.FETCH_BOOKMARKS_SUCCESS,
    payload: bookmarks
  };
}

export function bookmarksFetchingError(error) {
  return {
    type: actionTypes.FETCH_BOOKMARKS_ERROR,
    payload: error
  };
}

