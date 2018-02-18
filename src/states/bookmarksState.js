import { createSelector } from 'reselect';

export const bookmarksState = {
  currentBookmarks: null,
  bookmarksLoading: false,
  bookmarksError: false,
  collections: null,
  currentCollection: null,
  collectionsLoading: false,
  collectionsError: false,
  searchQuery: ''
};

const getBookmarksState = state => state.bookmarks;

export const getCurrentBookmarks = createSelector(
  [getBookmarksState],
  (state) => {
    if (!state.currentBookmarks) { return state.currentBookmarks; }
    return state.currentBookmarks
      .filter(bm => bm.title.toLowerCase().includes(state.searchQuery)
        || bm.link.toLowerCase().includes(state.searchQuery));
  }
);
export const getBookmarksLoading = createSelector([getBookmarksState], state => state.bookmarksLoading);
export const getBookmarksError = createSelector([getBookmarksState], state => state.bookmarksError);
export const getCollections = createSelector([getBookmarksState], state => state.collections);
export const getCurrentCollection = createSelector([getBookmarksState], state => state.currentCollection);
export const getCollectionsLoading = createSelector([getBookmarksState], state => state.collectionsLoading);
export const getCollectionsError = createSelector([getBookmarksState], state => state.collectionsError);
export const getSearchQuery = createSelector([getBookmarksState], state => state.searchQuery);

