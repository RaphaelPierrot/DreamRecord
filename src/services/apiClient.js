// frontend/src/services/apiClient.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.dreamrecord.net/", // URL de votre backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
