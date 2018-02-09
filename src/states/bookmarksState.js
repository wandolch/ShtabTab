import { createSelector } from 'reselect';

export const bookmarksState = {
  currentBookmarks: [],
  collections: [],
  bookmarksLoading: false,
  bookmarksError: false
};

const getBookmarksState = state => state.bookmarks;

export const getCurrentBookmarks = createSelector([getBookmarksState], state => state.currentBookmarks);
export const getBookmarksLoading = createSelector([getBookmarksState], state => state.bookmarksLoading);
export const getBookmarksError = createSelector([getBookmarksState], state => state.bookmarksError);
export const getCollections = createSelector([getBookmarksState], state => state.collections);
