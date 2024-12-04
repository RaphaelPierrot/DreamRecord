<!-- src/components/HomePage.vue -->
<template>
  <div class="home-page">
    <!-- Fond animé -->
    <HomeBackground />
    <!-- Sidebar -->
    <SideBarHome
      v-if="uiStore.isSidebarVisible"
      :userProfileImage="ProfileImage"
      :username="username"
      :notifications="notifications!"
      :stats="stats"
      :dailyAdvice="daily_advice"
    />

    <!-- Header -->
    <Header :userProfileImage="ProfileImage" />

    <!-- Contenu principal -->
    <main :class="{ mainWsidebar: uiStore.isSidebarVisible }">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from "vue";
import Header from "./Header.vue";
import SideBarHome from "./SideBarHome.vue";
import HomeBackground from "@/assets/AnimatedBackground/HomeBackground.vue";

import { useUIStore } from "@/store/uiStore";
import { useUserStore } from "@/store";

const userStore = useUserStore();

onMounted(() => {
  userStore.fetchUser();
});

const user = computed(() => userStore.user);
const uiStore = useUIStore();
const stats = {
  totalDreams: computed(() => user.value?.dreams?.length || 0),
  totalAnalyses: computed(() => user.value?.analyses?.length || 0),
  totalAdvice: computed(() => user.value?.advices?.length || 0),
};
const ProfileImage = computed(
  () => user.value?.profile_image || "default-profile.png"
);
const notifications = computed(
  () =>
    user.value?.notifications || [
      { message: "Votre rêve a été analysé", read: false },
      { message: "Nouvelle suggestion disponible", read: false },
      { message: "Mise à jour du système", read: true },
    ]
);
const username = computed(() => user.value?.username || "JeanDupont");
const daily_advice = computed(
  () =>
    user.value?.daily_advice ||
    "Prenez quelques minutes ce soir pour méditer avant de dormir."
);
</script>

<style scoped lang="scss">
.home-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;

  .mainWsidebar {
    margin-left: 230px; /* Largeur de la sidebar (220px) + left (20px) + marge */
  }

  main {
    margin-left: 0px;
    padding: 2em;
    position: relative;
    z-index: 0;
    transition: margin-left 0.3s ease;

    @media (max-width: 768px) {
      margin-left: 80px; /* Réduit la marge pour petits écrans */
    }
  }
}
</style>
