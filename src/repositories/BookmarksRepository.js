import TransportService from '../services/TransportService';
import apiRoutes from '../constants/apiRoutes';

export default class BookmarksRepository {
  static fetchBookmarksByCollectionId(id) {
    return TransportService.get(`${apiRoutes.collectionUrl}/${id}`);
  }

  static fetchCollections() {
    return TransportService.get(apiRoutes.collectionUrl);
  }

  static addBookmark({ collectionId, bookmark }) {
    return TransportService.post(`${apiRoutes.collectionUrl}/${collectionId}/${apiRoutes.bookmarkUrl}`, bookmark);
  }

  static deleteBookmark(id) {
    return TransportService.del(`${apiRoutes.bookmarkUrl}/${id}`);
  }

  static addCollection(title) {
    return TransportService.post(apiRoutes.collectionUrl, { title });
  }
}
