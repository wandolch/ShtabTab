export default class TransportService {
  static get(url, urlSearchParams, isAbsolute) {
    if (!isAbsolute) { url = process.env.API_URL + url; }
    return fetch(url, {
      method: 'GET',
      body: urlSearchParams
    });
  }

  static post(url, data, isAbsolute) {
    if (!isAbsolute) { url = process.env.API_URL + url; }
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }
}
