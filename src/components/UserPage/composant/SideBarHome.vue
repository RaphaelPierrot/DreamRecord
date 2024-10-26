<!-- src/components/SideBarHome.vue -->
<template>
  <aside :class="['sidebar', { collapsed }]">
    <!-- Informations de l'utilisateur -->
    <div class="user-info">
      <img :src="userProfileImage" alt="Photo de profil" />
      <h3 v-if="!collapsed">{{ username }}</h3>
    </div>

    <!-- Contenu pertinent -->
    <div class="sidebar-content">
      <!-- Notifications -->
      <section class="notifications">
        <h4 v-if="!collapsed">Notifications</h4>
        <ul>
          <li v-for="(notification, index) in notifications" :key="index">
            <span v-if="!collapsed">{{ notification.message }}</span>
            <span v-else>{{ notification.message.charAt(0) }}</span>
          </li>
        </ul>
      </section>

      <!-- Statistiques -->
      <section class="statistics">
        <h4 v-if="!collapsed">Statistiques</h4>
        <ul>
          <li v-if="!collapsed">Total de rêves : {{ stats.totalDreams }}</li>
          <li v-else>{{ stats.totalDreams }}</li>
          <li v-if="!collapsed">Analyses : {{ stats.totalAnalyses }}</li>
          <li v-else>{{ stats.totalAnalyses }}</li>
          <li v-if="!collapsed">Conseils : {{ stats.totalAdvice }}</li>
          <li v-else>{{ stats.totalAdvice }}</li>
        </ul>
      </section>

      <!-- Conseil du jour -->
      <section class="advice">
        <h4 v-if="!collapsed">Conseil du jour</h4>
        <p v-if="!collapsed">{{ dailyAdvice }}</p>
        <p v-else>{{ dailyAdvice.charAt(0) }}</p>
      </section>
    </div>

    <!-- Bouton de rétraction -->
    <button class="toggle-btn" @click="toggleSidebar">
      <font-awesome-icon :icon="collapsed ? 'chevron-right' : 'chevron-left'" />
    </button>
  </aside>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Notification } from "@/interfaces";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default defineComponent({
  name: "SideBarHome",
  components: {
    FontAwesomeIcon,
  },
  props: {
    userProfileImage: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    notifications: {
      type: Array as () => Notification[],
      required: true,
    },
    stats: {
      type: Object as () => {
        totalDreams: number;
        totalAnalyses: number;
        totalAdvice: number;
      },
      required: true,
    },
    dailyAdvice: {
      type: String,
      required: true,
    },
  },
  setup() {
    const collapsed = ref(false);

    const toggleSidebar = () => {
      collapsed.value = !collapsed.value;
    };

    return {
      collapsed,
      toggleSidebar,
    };
  },
});
</script>

<style scoped lang="scss">
@use "@/scss/variables.scss" as *;

.sidebar {
  position: fixed;
  top: 80px; /* Hauteur du header */
  left: 20px;
  width: 220px;
  height: calc(100vh - 80px);
  background: $color-card-background;
  color: $color-text-primary;
  padding: 1.5em;
  border-radius: 16px;
  box-shadow: $box-shadow;
  overflow-y: auto;
  transition: width 0.3s ease;
  z-index: 2;

  &.collapsed {
    width: 60px;
    padding: 1em;
  }

  .user-info {
    text-align: center;
    margin-bottom: 1.5em;

    img {
      height: 60px;
      width: 60px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 0.5em;
      border: 2px solid $color-border;
    }

    h3 {
      margin: 0;
      font-size: 1em;
      color: $color-heading-primary;
      transition: opacity 0.3s ease;
      opacity: 1;

      &.collapsed {
        opacity: 0;
      }
    }
  }

  .sidebar-content {
    width: 100%;

    section {
      margin-bottom: 1.5em;

      h4 {
        margin-bottom: 0.5em;
        color: $color-heading-secondary;
        border-bottom: 1px solid $color-border;
        padding-bottom: 0.3em;
        transition: display 0.3s ease;
        display: block;

        &.collapsed {
          display: none;
        }
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          margin-bottom: 0.5em;
          display: flex;
          align-items: center;

          span {
            transition: display 0.3s ease;
            display: inline;

            &.collapsed {
              display: none;
            }
          }
        }
      }

      p {
        color: $color-text-secondary;
        margin: 0;
        transition: display 0.3s ease;
        display: block;

        &.collapsed {
          display: none;
        }
      }
    }
  }

  .toggle-btn {
    position: absolute;
    bottom: 20px;
    right: -15px;
    background: $color-card-background;
    border: none;
    border-radius: 50%;
    box-shadow: $box-shadow;
    cursor: pointer;
    padding: 0.5em;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: lighten($color-card-background, 10%);
    }
  }
}

@media (max-width: 768px) {
  .sidebar {
    left: 10px;
    width: 60px;
    padding: 1em;

    &.collapsed {
      width: 0;
      padding: 0;
    }

    .user-info h3,
    .sidebar-content section h4,
    .sidebar-content section p {
      display: none;
    }

    .toggle-btn {
      right: -10px;
    }
  }

  .home-page main {
    margin-left: 80px; /* Réduit la marge pour les petits écrans */
  }

  header {
    left: 80px; /* Ajustement du header */
    width: calc(100% - 80px);
  }
}
</style>
