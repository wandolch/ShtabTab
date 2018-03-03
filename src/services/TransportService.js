import axios from 'axios';

export default class TransportService {
  static get(url, params, isAbsolute) {
    if (!isAbsolute) { url = process.env.API_URL + url; }
    return axios.get(url, { params });
  }

  static post(url, data, headers, isAbsolute) {
    if (!isAbsolute) { url = process.env.API_URL + url; }
    return axios.post(url, JSON.stringify(data), headers);
  }

  static put(url, data, headers, isAbsolute) {
    if (!isAbsolute) { url = process.env.API_URL + url; }
    return axios.put(url, JSON.stringify(data), headers);
  }

  static del(url, params, isAbsolute) {
    if (!isAbsolute) { url = process.env.API_URL + url; }
    return axios.delete(url, { params });
  }
}
