import { createSelector } from 'reselect';

export const bookmarksState = {
  currentBookmarks: null,
  bookmarksLoading: false,
  collections: null,
  currentCollection: null,
  collectionsLoading: false,
  searchQuery: '',
  addBookmarkLoading: false,
  delBookmarkLoading: false,
  addCollectionLoading: false,
  shareCollectionLoading: false,
  shareCollectionError: false,
  deleteCollectionLoading: false,
  deleteCollectionError: false,
  toggleCollectionViewLoading: false,
  toggleCollectionViewError: false
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
export const getCollections = createSelector([getBookmarksState], state => state.collections);
export const getCurrentCollection = createSelector([getBookmarksState], state => state.currentCollection);
export const getCollectionsLoading = createSelector([getBookmarksState], state => state.collectionsLoading);
export const getSearchQuery = createSelector([getBookmarksState], state => state.searchQuery);
export const getAddBookmarkLoading = createSelector([getBookmarksState], state => state.addBookmarkLoading);
export const getShareCollectionLoading = createSelector([getBookmarksState], state => state.shareCollectionLoading);
export const getShareCollectionError = createSelector([getBookmarksState], state => state.shareCollectionError);
export const getDeleteCollectionLoading = createSelector([getBookmarksState], state => state.deleteCollectionLoading);
export const getDeleteCollectionError = createSelector([getBookmarksState], state => state.deleteCollectionError);

