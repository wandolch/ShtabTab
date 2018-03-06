function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.message);
  error.response = response;
  throw error;
}

function parseJSON(response) {
  return response.json();
}

function getAuthHeader() {
  const user = JSON.parse(localStorage.getItem('st-user'));

  if (user && user.token) {
    return `Basic ${user.token}`;
  }
  return '';
}

export default class TransportService {
  static get(url, urlSearchParams, isAbsolute) {
    if (!isAbsolute) { url = process.env.API_URL + url; }
    return fetch(url, {
      headers: {
        Authorization: getAuthHeader()
      },
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
        Authorization: getAuthHeader(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(checkStatus)
      .then(parseJSON);
  }
}

