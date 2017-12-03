import { actionTypes } from '../actions/bookmarksActions';
import { bookmarksState } from '../states/bookmarksState';

export default (state = bookmarksState, action) => {
  switch (action.type) {
  case actionTypes.LOAD_BOOKMARKS:
    return Object.assign({}, state, {
      allBookmarks: action.payload
    });

  default:
    return state;
  }
};

