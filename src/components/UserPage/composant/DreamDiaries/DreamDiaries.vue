<!-- src/components/UserPage/DreamDiaries.vue -->
<template>
  <div class="dream-diaries">
    <h2>Mes Journaux de Rêves</h2>

    <!-- Navigation -->
    <div class="navigation">
      <button
        @click="setViewMode('add')"
        :class="{ active: viewMode === 'add' }"
      >
        Ajouter un Rêve
      </button>
      <button
        @click="setViewMode('view')"
        :class="{ active: viewMode === 'view' }"
      >
        Voir les Rêves
      </button>
      <router-link to="/home" class="back-dashboard"
        >← Retour au Dashboard</router-link
      >
    </div>

    <!-- Vue Ajouter ou Voir -->
    <div class="content">
      <AddDream v-if="viewMode === 'add'" @dream-added="handleDreamAdded" />
      <ViewDreams v-else-if="viewMode === 'view'" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mockUser } from "@/data/user";
import AddDream from "./AddDream.vue";
import ViewDreams from "./ViewDreams.vue";
import type { Dream } from "@/interfaces";

export default defineComponent({
  name: "DreamDiaries",
  components: {
    AddDream,
    ViewDreams,
  },
  setup() {
    const viewMode = ref<"add" | "view">("add");

    const setViewMode = (mode: "add" | "view") => {
      viewMode.value = mode;
    };

    const handleDreamAdded = () => {
      // Vous pouvez ajouter des actions supplémentaires ici si nécessaire
      // Par exemple, passer automatiquement à la vue des rêves après l'ajout
      // setViewMode('view');
    };

    return {
      viewMode,
      setViewMode,
      handleDreamAdded,
    };
  },
});
</script>

<style scoped lang="scss">
@use "sass:color";
@use "@/scss/variables.scss" as *;
@use "@/scss/mixins.scss" as *;

.dream-diaries {
  padding: 2em;

  h2 {
    text-align: center;
    color: $color-heading-primary;
    margin-bottom: 1.5em;
  }

  .navigation {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1em;
    margin-bottom: 2em;

    button {
      @include button($color-button-primary, $color-button-primary-text);
      padding: 0.5em 1em;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &.active {
        background-color: color.adjust($color-button-primary, $lightness: -10%);
      }

      &:hover:not(.active) {
        background-color: color.adjust($color-button-primary, $lightness: -10%);
      }
    }

    .back-dashboard {
      @include button($color-button-secondary, $color-button-secondary-text);
      text-decoration: none;
      padding: 0.5em 1em;
      display: flex;
      align-items: center;
      gap: 0.5em;
      cursor: pointer;

      &:hover {
        background-color: color.adjust(
          $color-button-secondary,
          $lightness: -10%
        );
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2em;
  }
}

@media (max-width: 768px) {
  .dream-diaries {
    padding: 1em;

    .navigation {
      flex-direction: column;
      gap: 0.5em;

      .back-dashboard {
        padding: 0.5em 1em;
      }
    }

    .content {
      .dream-form,
      .dream-list {
        max-width: 100%;
      }
    }
  }
}
</style>
