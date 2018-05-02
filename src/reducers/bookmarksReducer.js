import { actionTypes } from '../constants/actionTypes';
import { bookmarksState } from '../states/bookmarksState';
import TransformService from '../services/TransformService';

export default (state = bookmarksState, action) => {
  switch (action.type) {
  case actionTypes.FETCH_BOOKMARKS:
    return Object.assign({}, state, {
      currentBookmarks: [],
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

  case actionTypes.DEL_BOOKMARK:
    return Object.assign({}, state, {
      delBookmarkLoading: true
    });

  case actionTypes.DEL_BOOKMARK_SUCCESS:
    return Object.assign({}, state, {
      currentBookmarks: action.payload,
      delBookmarkLoading: false
    });

  case actionTypes.DEL_BOOKMARK_ERROR:
    return Object.assign({}, state, {
      delBookmarkLoading: false
    });

  case actionTypes.ADD_COLLECTION:
    return Object.assign({}, state, {
      addCollectionLoading: true
    });

  case actionTypes.ADD_COLLECTION_SUCCESS:
    return Object.assign({}, state, {
      collections: [...state.collections, action.payload],
      addCollectionLoading: false
    });

  case actionTypes.ADD_COLLECTION_ERROR:
    return Object.assign({}, state, {
      addCollectionLoading: false
    });

  case actionTypes.USER_LOGOUT:
    return Object.assign(bookmarksState);

  case actionTypes.SHARE_COLLECTION:
    return Object.assign({}, state, {
      shareCollectionLoading: true,
      shareCollectionError: false
    });

  case actionTypes.SHARE_COLLECTION_SUCCESS:
    return Object.assign({}, state, {
      shareCollectionLoading: false,
      shareCollectionError: false
    });

  case actionTypes.SHARE_COLLECTION_ERROR:
    return Object.assign({}, state, {
      shareCollectionLoading: false,
      shareCollectionError: true
    });

  case actionTypes.DELETE_COLLECTION:
    return Object.assign({}, state, {
      deleteCollectionLoading: true,
      deleteCollectionError: false
    });

  case actionTypes.DELETE_COLLECTION_SUCCESS:
    return Object.assign({}, state, {
      collections: action.payload,
      deleteCollectionLoading: false,
      deleteCollectionError: false
    });

  case actionTypes.DELETE_COLLECTION_ERROR:
    return Object.assign({}, state, {
      deleteCollectionLoading: false,
      deleteCollectionError: true
    });

  case actionTypes.TOGGLE_VIEW:
    return Object.assign({}, state, {
      toggleCollectionViewLoading: true,
      toggleCollectionViewError: false
    });

  case actionTypes.TOGGLE_VIEW_SUCCESS:
    return Object.assign({}, state, {
      collections: TransformService.mergeUniq([action.payload], state.collections).sort((a, b) => a.index > b.index),
      toggleCollectionViewLoading: false,
      toggleCollectionViewError: false
    });

  case actionTypes.TOGGLE_VIEW_ERROR:
    return Object.assign({}, state, {
      toggleCollectionViewLoading: false,
      toggleCollectionViewError: true
    });

  case actionTypes.SET_FILTER_SEARCH:
    return Object.assign({}, state, {
      filterSearch: action.payload.toLowerCase()
    });

  case actionTypes.GET_TOPICS:
    return Object.assign({}, state, {
      topicsLoading: true,
      topicsError: false
    });

  case actionTypes.GET_TOPICS_SUCCESS:
    return Object.assign({}, state, {
      topics: action.payload,
      topicsLoading: false,
      topicsError: false
    });

  case actionTypes.GET_TOPICS_ERROR:
    return Object.assign({}, state, {
      topicsLoading: false,
      topicsError: true
    });

  case actionTypes.GET_FILTERED_BOOKMARKS:
    return Object.assign({}, state, {
      filteredBookmarksLoading: true,
      filteredBookmarksError: false
    });

  case actionTypes.GET_FILTERED_BOOKMARKS_SUCCESS:
    return Object.assign({}, state, {
      filteredBookmarks: action.payload,
      filteredBookmarksLoading: false,
      filteredBookmarksError: false
    });

  case actionTypes.GET_FILTERED_BOOKMARKS_ERROR:
    return Object.assign({}, state, {
      filteredBookmarksLoading: false,
      filteredBookmarksError: true
    });

  default:
    return state;
  }
};
