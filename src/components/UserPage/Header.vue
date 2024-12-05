<!-- src/components/Header.vue -->
<template>
  <header>
    <div class="header-left">
      <button class="burger-menu" @click="uiStore.toggleSidebar()">☰</button>
      <div class="logo" @click="goToHome">
        <img src="@/assets/logo.png" alt="DreamRecords Logo" />
      </div>
    </div>
    <div class="header-right">
      <div class="profile" @click="goToProfile">
        <img :src="props.userProfileImage" alt="Photo de profil" />
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useUIStore } from "../../store/uiStore";
const props = defineProps({ userProfileImage: String });

const uiStore = useUIStore();
const router = useRouter();
const goToHome = () => {
  router.push({ path: "/home" });
  uiStore.showSidebar();
};
const goToProfile = () => {
  router.push({ name: "profile" });
  uiStore.showSidebar();
};
</script>

<style scoped lang="scss">
@use "@/scss/variables.scss" as *;
.burger-menu {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #fff;
}
.header-left {
  display: flex;
  gap: 2em;
}
header {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 1em 2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;

  .logo {
    img {
      height: 50px;
      cursor: pointer;
    }
  }

  .header-right {
    display: flex;
    align-items: center;

    .profile {
      padding-right: 60px;
      img {
        height: 60px;
        width: 60px;
        border-radius: 50%;
        object-fit: cover;
        cursor: pointer;
        border: 2px solid $color-border;
      }
    }
  }
}
</style>
