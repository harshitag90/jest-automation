const axios = require('../node_modules/axios');

const axiosInstance = axios.default.create({
    baseURL: 'https://feedjar.azurewebsites.net/'
});

module.exports = axiosInstance;