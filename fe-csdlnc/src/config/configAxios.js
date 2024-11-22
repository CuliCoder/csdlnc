import axios from "axios";
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-control-allow-origin": process.env.REACT_APP_API_URL,
    "Access-Control-Allow-Credentials": true,
  },
});

export default instance;
