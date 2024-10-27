<!-- src/components/HomePage.vue -->
<template>
  <div class="home-page">
    <!-- Fond animé -->
    <HomeBackground />
    <!-- Sidebar -->
    <SideBarHome
      :userProfileImage="user.profileImage"
      :username="user.username"
      :notifications="user.notifications"
      :stats="stats"
      :dailyAdvice="user.dailyAdvice"
    />

    <!-- Header -->
    <Header :userProfileImage="user.profileImage" />

    <!-- Contenu principal -->
    <main>
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Header from "./Header.vue";
import SideBarHome from "./SideBarHome.vue";
import HomeBackground from "@/assets/AnimatedBackground/HomeBackground.vue";
import type { User } from "@/interfaces";
import { mockUser } from "@/data/user";

export default defineComponent({
  name: "HomePage",
  components: {
    Header,
    SideBarHome,
    HomeBackground,
  },
  setup() {
    const user: User = mockUser;

    const stats = {
      totalDreams: user.totalDreams,
      totalAnalyses: user.totalAnalyses,
      totalAdvice: user.totalAdvice,
    };

    return {
      user,
      stats,
    };
  },
});
</script>

<style scoped lang="scss">
.home-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;

  main {
    margin-left: 260px; /* Largeur de la sidebar (220px) + left (20px) + marge */
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
