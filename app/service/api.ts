import axios from "axios";

const api = axios.create({
  baseURL: "https://instzaa-api-production.up.railway.app/",
});

export default api;