const devApiUrl = 'http://localhost:8080/api/';
const prodApiUrl = '/api/';

module.exports = process.env.NODE_ENV === 'production' ? prodApiUrl : devApiUrl;
