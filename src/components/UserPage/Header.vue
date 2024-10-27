<!-- src/components/Header.vue -->
<template>
  <header>
    <div class="logo" @click="goToHome">
      <img src="@/assets/logo.png" alt="DreamRecords Logo" />
    </div>
    <div class="header-right">
      <div class="profile" @click="goToProfile">
        <img :src="userProfileImage" alt="Photo de profil" />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Header",
  props: {
    userProfileImage: {
      type: String,
      required: true,
    },
  },
  setup() {
    const router = useRouter();
    const goToHome = () => {
      router.push({ path: "/home" });
    };
    const goToProfile = () => {
      router.push({ name: "profile" });
    };

    return {
      goToProfile,
      goToHome,
    };
  },
});
</script>

<style scoped lang="scss">
@use "@/scss/variables.scss" as *;

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
