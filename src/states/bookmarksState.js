import { createSelector } from 'reselect';

export const bookmarksState = {
  currentBookmarks: null,
  bookmarksLoading: false,
  bookmarksError: false,
  collections: null,
  currentCollection: null,
  collectionsLoading: false,
  collectionsError: false
};

const getBookmarksState = state => state.bookmarks;

export const getCurrentBookmarks = createSelector([getBookmarksState], state => state.currentBookmarks);
export const getBookmarksLoading = createSelector([getBookmarksState], state => state.bookmarksLoading);
export const getBookmarksError = createSelector([getBookmarksState], state => state.bookmarksError);
export const getCollections = createSelector([getBookmarksState], state => state.collections);
export const getCurrentCollection = createSelector([getBookmarksState], state => state.currentCollection);
export const getCollectionsLoading = createSelector([getBookmarksState], state => state.collectionsLoading);
export const getCollectionsError = createSelector([getBookmarksState], state => state.collectionsError);

