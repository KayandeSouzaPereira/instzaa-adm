import axios from "axios";

const api = axios.create({
  baseURL: "http://ec2-56-124-45-234.sa-east-1.compute.amazonaws.com:8080/",
  //baseURL: "http://localhost:8080/",
});

export default api;