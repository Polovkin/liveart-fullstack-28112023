import axios, { AxiosInstance } from 'axios';
import Configuration from '../utils/Configuration';
import store from '../../store/Store';

let $http: AxiosInstance;

function initAxios() {
  $http = axios.create();
  const baseUrl = getBaseUrl();
  setBaseUrl($http, baseUrl);
  setUpAuthHeader($http);
  setUpUpdateToken($http);
  return $http;
}

function setBaseUrl($http: AxiosInstance, baseUrl: string) {
  $http.defaults.baseURL = baseUrl;
}

function getBaseUrl() {
  return Configuration.value('VITE_VUE_APP_API_URL');
}

const createSetAuthInterceptor = () => async (config: any) => {
  store.dispatch('authModule/checkAuth', null, { root: true }).then(res => {
    if (res) {
      config.headers.Authorization = `Bearer ${store.getters['authModule/token']}`;
    } else {
      delete config.headers.Authorization;
    }
  });
  store.dispatch('authModule/updateLastUse', null, { root: true });
  return config;
};

const createUpdateAuthInterceptor = () => async (error: any) => {
  if (error.response.status === 401 && error.config && !error.config.__isRetryRequest) {
    await store.dispatch('authModule/logout');
  }
  throw error;
};

function setUpAuthHeader($http: AxiosInstance) {
  $http.interceptors.request.use(createSetAuthInterceptor(), error => {
    Promise.reject(error);
  });
}

function setUpUpdateToken($http: AxiosInstance) {
  $http.interceptors.request.use(response => {
    return response;
  }, createUpdateAuthInterceptor());
}

initAxios();

export { $http };
