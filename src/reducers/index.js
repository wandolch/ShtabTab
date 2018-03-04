import { combineReducers } from 'redux';
import bookmarksReducer from './bookmarksReducer';
import routeReducer from './routeReducer';
import commonReducer from './commonReducer';

export default combineReducers({
  bookmarks: bookmarksReducer,
  route: routeReducer,
  common: commonReducer
});
