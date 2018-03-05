function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseJSON(response) {
  return response.json();
}

export default class TransportService {
  static get(url, urlSearchParams, isAbsolute) {
    if (!isAbsolute) { url = process.env.API_URL + url; }
    return fetch(url, {
      method: 'GET',
      body: urlSearchParams
    }).then(checkStatus)
      .then(parseJSON);
  }

  static post(url, data, isAbsolute) {
    if (!isAbsolute) { url = process.env.API_URL + url; }
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(checkStatus)
      .then(parseJSON);
  }
}

