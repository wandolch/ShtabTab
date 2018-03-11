const devOrigin = 'http://localhost:8080/';
const prodOrigin = '/';
const devApiUrl = `${devOrigin}api/`;
const prodApiUrl = `${prodOrigin}api/`;

module.exports.apiUrl = process.env.NODE_ENV === 'production' ? prodApiUrl : devApiUrl;
module.exports.originUrl = process.env.NODE_ENV === 'production' ? prodOrigin : devOrigin;
