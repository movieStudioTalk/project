import axios from "axios";

const api = axios.create({
  //로컬
  baseURL: "http://localhost:8080",
  //운영
  // baseURL: "http://192.168.0.63:8080",
  withCredentials: true,
});

export default api;
