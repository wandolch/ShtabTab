import { actionTypes } from '../actions/bookmarksActions';
import { bookmarksState } from '../states/bookmarksState';

export default (state = bookmarksState, action) => {
  switch (action.type) {
  case actionTypes.LOAD_BOOKMARKS:
    return Object.assign({}, state, {
      allBookmarks: action.payload
    });

  case actionTypes.LOAD_COLLECTIONS:
    return Object.assign({}, state, {
      collections: action.payload
    });

  default:
    return state;
  }
};
