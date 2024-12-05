// authService.ts
import router from "@/router"; // Importez votre instance de router si nécessaire
import { Capacitor } from "@capacitor/core";
import { Preferences } from "@capacitor/preferences";
import apiClient from "./apiClient";

const isMobileApp = Capacitor.isNativePlatform();

export async function getAccessToken(): Promise<string | null> {
  if (isMobileApp) {
    const ret = await Preferences.get({ key: "access_token" });
    return ret.value;
  } else {
    return Promise.resolve(localStorage.getItem("access_token"));
  }
}

export async function getRefreshToken(): Promise<string | null> {
  if (isMobileApp) {
    const ret = await Preferences.get({ key: "refresh_token" });
    return ret.value;
  } else {
    return Promise.resolve(localStorage.getItem("refresh_token"));
  }
}

export async function setAccessToken(token: string): Promise<void> {
  if (isMobileApp) {
    await Preferences.set({ key: "access_token", value: token });
  } else {
    localStorage.setItem("access_token", token);
  }
}

export async function setRefreshToken(token: string): Promise<void> {
  if (isMobileApp) {
    await Preferences.set({ key: "refresh_token", value: token });
  } else {
    localStorage.setItem("refresh_token", token);
  }
}

export async function logoutUser(): Promise<void> {
  const refreshToken = await getRefreshToken();
  if (refreshToken) {
    try {
      await apiClient.post("/auth/logout.php", { refresh_token: refreshToken });
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  }
  // Nettoyer les tokens en local (access_token, refresh_token)
  if (isMobileApp) {
    await Preferences.remove({ key: "access_token" });
    await Preferences.remove({ key: "refresh_token" });
    // Naviguer vers l'écran de connexion
    router.push({ name: "login" });
  } else {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    // Rediriger vers la page de connexion
    window.location.href = "/login";
  }
}
