import { createSelector } from 'reselect';

export const bookmarksState = {
  allBookmarks: [],
  collections: []
};

const getBookmarksState = state => state.bookmarks;

export const getBookmarks = createSelector([getBookmarksState], state => state.allBookmarks);
export const getCollections = createSelector([getBookmarksState], state => state.collections);
