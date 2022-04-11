import axios from "axios";

const api = axios.create({
  baseURL: "http://iste501team1.xyz:5000/api",
});

export default api;
