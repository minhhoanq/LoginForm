import axios from "axios";
import { store } from "../redux/store";
import { startLoading, stopLoading } from "../redux/global";

const request = axios.create({
    baseURL: `http://localhost:8000/api/v1/`,
});

request.interceptors.request.use(function (config) {
    const userLocalstorage = JSON.parse(localStorage.getItem("token"));
    const token = userLocalstorage?.at;
    const email = userLocalstorage?.email;
    config.headers.Authorization = token ? `${token}` : "";
    config.headers.set("x-client-email", email ? email : "");
    store.dispatch(startLoading());
    return config;
});

request.interceptors.response.use(
    function (response) {
        store.dispatch(stopLoading());
        return response;
    },
    function (error) {
        store.dispatch(stopLoading());
        return error;
    }
);

export default request;
