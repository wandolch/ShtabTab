async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  }
  const errorResponse = await response.json();
  const error = new Error(errorResponse.message);
  error.response = response;
  throw error;
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
  }
}

