import TransportService from '../services/TransportService';
import apiRoutes from '../constants/apiRoutes';

export default class BookmarksRepository {
  static fetchBookmarksByCollectionId(id) {
    return TransportService.get(`${apiRoutes.collectionUrl}/${id}`);
  }

  static fetchCollections() {
    return TransportService.get(apiRoutes.collectionUrl);
  }
}
