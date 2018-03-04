import TransportService from '../services/TransportService';
import apiRoutes from '../constants/apiRoutes';

export default class CommonRepository {
  static signIn(token) {
    return TransportService.post(apiRoutes.signInUrl, { token });
  }
}
