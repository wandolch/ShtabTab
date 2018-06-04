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

export function bookmarksFetchingError() {
  return {
    type: actionTypes.FETCH_BOOKMARKS_ERROR
  };
}

export function fetchCollections() {
  return {
    type: actionTypes.FETCH_COLLECTIONS
  };
}

export function collectionsFetched(collections) {
  return {
    type: actionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collections
  };
}

export function collectionsFetchingError() {
  return {
    type: actionTypes.FETCH_COLLECTIONS_ERROR
  };
}

export function setCurrentCollection(collection) {
  return {
    type: actionTypes.SET_CURRENT_COLLECTION,
    payload: collection
  };
}

export function setBookmarksSearch(query) {
  return {
    type: actionTypes.SET_BOOKMARKS_SEARCH,
    payload: query
  };
}

export function addBookmark(bm) {
  return {
    type: actionTypes.ADD_BOOKMARK,
    payload: bm
  };
}

export function addBookmarkSuccess(bm) {
  return {
    type: actionTypes.ADD_BOOKMARK_SUCCESS,
    payload: bm
  };
}

export function addBookmarkError() {
  return {
    type: actionTypes.ADD_BOOKMARK_ERROR
  };
}

export function delBookmark(id) {
  return {
    type: actionTypes.DEL_BOOKMARK,
    payload: id
  };
}

export function delBookmarkSuccess(bookmarks) {
  return {
    type: actionTypes.DEL_BOOKMARK_SUCCESS,
    payload: bookmarks
  };
}

export function delBookmarkError() {
  return {
    type: actionTypes.DEL_BOOKMARK_ERROR
  };
}

export function addCollection(title) {
  return {
    type: actionTypes.ADD_COLLECTION,
    payload: title
  };
}

export function addCollectionSuccess(collection) {
  return {
    type: actionTypes.ADD_COLLECTION_SUCCESS,
    payload: collection
  };
}

export function addCollectionError() {
  return {
    type: actionTypes.ADD_COLLECTION_ERROR
  };
}

export function userLogout() {
  return {
    type: actionTypes.USER_LOGOUT
  };
}

export function shareCollection(collectionId, email) {
  return {
    type: actionTypes.SHARE_COLLECTION,
    payload: { collectionId, email }
  };
}

export function shareCollectionSuccess() {
  return {
    type: actionTypes.SHARE_COLLECTION_SUCCESS
  };
}

export function shareCollectionError() {
  return {
    type: actionTypes.SHARE_COLLECTION_ERROR
  };
}

export function deleteCollection(id) {
  return {
    type: actionTypes.DELETE_COLLECTION,
    payload: id
  };
}

export function deleteCollectionSuccess(collections) {
  return {
    type: actionTypes.DELETE_COLLECTION_SUCCESS,
    payload: collections
  };
}

export function deleteCollectionError() {
  return {
    type: actionTypes.DELETE_COLLECTION_ERROR
  };
}

export function toggleCollectionView(id) {
  return {
    type: actionTypes.TOGGLE_VIEW,
    payload: id
  };
}

export function toggleCollectionViewSuccess(collection) {
  return {
    type: actionTypes.TOGGLE_VIEW_SUCCESS,
    payload: collection
  };
}

export function toggleCollectionViewError() {
  return {
    type: actionTypes.TOGGLE_VIEW_ERROR
  };
}

export function setSmartFilterSearch(query) {
  return {
    type: actionTypes.SET_FILTER_SEARCH,
    payload: query
  };
}

export function getTopicsAction() {
  return {
    type: actionTypes.GET_TOPICS,
  };
}

export function getTopicsSuccess(topics) {
  return {
    type: actionTypes.GET_TOPICS_SUCCESS,
    payload: topics
  };
}

export function getTopicsError() {
  return {
    type: actionTypes.GET_TOPICS_ERROR
  };
}

export function getFilteredBookmarksAction(topics) {
  return {
    type: actionTypes.GET_FILTERED_BOOKMARKS,
    payload: topics
  };
}

export function getFilteredBookmarksSuccess(bookmarks) {
  return {
    type: actionTypes.GET_FILTERED_BOOKMARKS_SUCCESS,
    payload: bookmarks
  };
}

export function getFilteredBookmarksError() {
  return {
    type: actionTypes.GET_FILTERED_BOOKMARKS_ERROR
  };
}

export function sendStat(id) {
  return {
    type: actionTypes.SEND_STAT,
    payload: id
  };
}

export function editCollection(collectionId, newTitle) {
  return {
    type: actionTypes.EDIT_COLLECTION,
    payload: { collectionId, newTitle }
  };
}

export function editCollectionSuccess(collections) {
  return {
    type: actionTypes.EDIT_COLLECTION_SUCCESS,
    payload: collections
  };
}

export function editCollectionError() {
  return {
    type: actionTypes.EDIT_COLLECTION_ERROR
  };
}
