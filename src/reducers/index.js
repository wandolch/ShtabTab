import { combineReducers } from 'redux';
import bookmarksReducer from './bookmarksReducer';
import routeReducer from './routeReducer';

export default combineReducers({
  bookmarks: bookmarksReducer,
  route: routeReducer
});
