import { actionTypes } from '../constants/actionTypes';
import { bookmarksState } from '../states/bookmarksState';

export default (state = bookmarksState, action) => {
  switch (action.type) {
  case actionTypes.FETCH_BOOKMARKS:
    return Object.assign({}, state, {
      bookmarksLoading: true
    });

  case actionTypes.FETCH_BOOKMARKS_SUCCESS:
    return Object.assign({}, state, {
      currentBookmarks: action.payload,
      bookmarksLoading: false
    });

  case actionTypes.FETCH_BOOKMARKS_ERROR:
    return Object.assign({}, state, {
      bookmarksLoading: false
    });

  case actionTypes.FETCH_COLLECTIONS:
    return Object.assign({}, state, {
      collectionsLoading: true
    });

  case actionTypes.FETCH_COLLECTIONS_SUCCESS:
    return Object.assign({}, state, {
      collections: action.payload,
      collectionsLoading: false
    });

  case actionTypes.FETCH_COLLECTIONS_ERROR:
    return Object.assign({}, state, {
      collectionsLoading: false
    });

  case actionTypes.SET_CURRENT_COLLECTION:
    return Object.assign({}, state, {
      currentCollection: action.payload
    });

  case actionTypes.SET_BOOKMARKS_SEARCH:
    return Object.assign({}, state, {
      searchQuery: action.payload.toLowerCase()
    });

  case actionTypes.ADD_BOOKMARK:
    return Object.assign({}, state, {
      addBookmarkLoading: true
    });

  case actionTypes.ADD_BOOKMARK_SUCCESS:
    return Object.assign({}, state, {
      currentBookmarks: [...state.currentBookmarks, action.payload],
      addBookmarkLoading: false
    });

  case actionTypes.ADD_BOOKMARK_ERROR:
    return Object.assign({}, state, {
      addBookmarkLoading: false
    });

  default:
    return state;
  }
};
