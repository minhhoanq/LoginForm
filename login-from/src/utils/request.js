import axios from "axios";

const request = axios.create({
    baseURL: `http://localhost:8000/api/v1/`,
});

request.interceptors.request.use(function (config) {
    return config;
});
