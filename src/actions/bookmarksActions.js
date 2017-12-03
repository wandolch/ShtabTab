import Request from 'superagent';
import apiRoutes from '../constants/apiRoutes';

export const actionTypes = {
  LOAD_BOOKMARKS: 'LOAD_BOOKMARKS'
};

export const loadBookmarks = () => (dispatch) => {
  Request
    .get(process.env.API_URL + apiRoutes.getBookmarksUrl)
    .send()
    .set('accept', 'application/json')
    .end((err, res) => {
      if (err) {
        console.log('err', err);
      } else {
        dispatch({ type: actionTypes.LOAD_BOOKMARKS, payload: res.body });
      }
    });
};
