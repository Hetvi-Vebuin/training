import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // Backend URL
  withCredentials: true, // Allow cookies & auth headers
});

export default API;
