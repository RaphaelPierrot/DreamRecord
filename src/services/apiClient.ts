// services/apiClient.js
import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  logoutUser,
  setAccessToken,
} from "./authService";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
// Intercepteur pour ajouter le token d'accès à chaque requête
apiClient.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Intercepteur pour gérer les erreurs d'authentification
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = await getRefreshToken();

        if (!refreshToken) {
          await logoutUser();
          return Promise.reject(error);
        }

        const response = await axios.post(
          "https://api.dreamrecord.net/auth/refresh_token.php",
          {
            refresh_token: refreshToken,
          }
        );

        if (response.data.status === "success") {
          await setAccessToken(response.data.access_token);

          // Mettre à jour le header Authorization
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${response.data.access_token}`;
          return axios(originalRequest);
        } else {
          await logoutUser();
          return Promise.reject(error);
        }
      } catch (refreshError) {
        await logoutUser();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
