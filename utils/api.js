import axios from "axios";

const API = axios.create({
  baseURL: "https://batuhannayman-to-do-backend.onrender.com/api",
});

// Token varsa header’a ekle
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
