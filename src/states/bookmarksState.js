import { createSelector } from 'reselect';

export const bookmarksState = {
  allBookmarks: []
};

const getBookmarksState = state => state.bookmarks;

export const getBookmarks = createSelector([getBookmarksState], state => state.allBookmarks);
