// store/index.js
import { defineStore } from "pinia";

import apiClient from "@/services/apiClient";
import type { User } from "@/Interfaces";
import { computed, ref } from "vue";
import { logoutUser } from "@/services/authService";

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null);

  const fetchUser = async () => {
    try {
      const response = await apiClient.get("/auth/get_user_data.php");
      if (response.data.status === "success") {
        user.value = response.data.data;
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données utilisateur:",
        error
      );
    }
  };

  const clearUser = () => {
    user.value = null;
  };
  const logout = async () => {
    user.value = null;
    await logoutUser();
  };
  const isAuthenticated = computed(() => !!user.value);

  return {
    user,
    fetchUser,
    clearUser,
    isAuthenticated,
    logout,
  };
});
