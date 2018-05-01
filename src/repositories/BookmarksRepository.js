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

  static shareCollection({ collectionId, email }) {
    return TransportService.post(`${apiRoutes.collectionUrl}/${collectionId}/${apiRoutes.shareUrl}`, { email });
  }

  static deleteCollection(id) {
    return TransportService.del(`${apiRoutes.collectionUrl}/${id}`);
  }

  static toggleCollectionView(id) {
    return TransportService.get(`${apiRoutes.collectionUrl}/${id}/toggle-style`);
  }
}
