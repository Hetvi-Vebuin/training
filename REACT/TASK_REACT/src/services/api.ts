import axios from "axios";
import store from "../redux/store/Store";
const API = axios.create({
  baseURL: "http://localhost:3000", // Backend URL
  withCredentials: true, // Allow cookies & auth headers
});

API.interceptors.request.use(async (config) => {
  try {
    const storeData=store.getState();
    if (storeData) {
      const token=storeData.auth.token;
      if (storeData) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch (error) {
    console.error("Error retrieving token:", error);
  }
  console.log("Making API request:", config.method, config.url);
  return config; 
});

export default API;
