import axios from "axios";

const api = axios.create({
  baseURL: "http://ec2-54-233-218-107.sa-east-1.compute.amazonaws.com:8080/",
  //baseURL: "http://localhost:3000/",
});

export default api;