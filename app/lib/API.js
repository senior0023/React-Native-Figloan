const axios = require('axios').default;
const API = axios.create({
    baseURL: 'https://app.figloans.com/api/mobile/',
    timeout: 2000,
    headers: { 'X-Custom-Header': 'foobar' }
});

export default API;
