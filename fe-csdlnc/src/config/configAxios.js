import axios from "axios";
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-control-allow-origin": import.meta.env.REACT_APP_API_URL,
    "Access-Control-Allow-Credentials": true,
  },
});
instance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // const csrfToken = getCsrfToken();
    // if (csrfToken) {
    //   config.headers['X-CSRF-Token'] = csrfToken;
    // }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.data.code === 2) {
      window.location.href = "/";
    }
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
