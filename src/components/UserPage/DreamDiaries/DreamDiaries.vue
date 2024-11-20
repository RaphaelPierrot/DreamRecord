<!-- src/components/UserPage/DreamDiaries/DreamDiaries.vue -->
<template>
  <div class="dream-diaries">
    <div v-if="isAddingDream">
      <AddDream @close="closeAddDream" />
    </div>
    <div v-else>
      <h2>Mes Journaux de Rêves</h2>

      <!-- Composant Tabs -->
      <Tabs>
        <!-- Onglet : Ajouter un Rêve -->
        <Tab name="add" title="Ajouter un Rêve">
          <p>
            Bienvenue dans vos journaux de rêves. Enregistrez vos rêves pour les
            revisiter et mieux comprendre vos pensées nocturnes.
          </p>
          <button class="add-dream-button" @click="openAddDream">
            Ajouter un Rêve
          </button>
        </Tab>

        <!-- Onglet : Voir les Rêves -->
        <Tab name="view" title="Voir les Rêves">
          <!-- Liste des Rêves -->
          <ViewDreams />
        </Tab>
      </Tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import Tabs from "./Tabs.vue";
import Tab from "./Tab.vue";
import QuestionSection from "./QuestionSection.vue";
import type { User, Dream } from "@/Interfaces";
import { mockUser } from "@/data/user";
import ViewDreams from "./ViewDreams.vue";
import AddDream from "./AddDream.vue";
import { useUIStore } from "@/store/uiStore";

export default defineComponent({
  name: "DreamDiaries",
  components: {
    Tabs,
    Tab,
    QuestionSection,
    ViewDreams,
    AddDream,
  },
  setup() {
    const isAddingDream = ref(false);
    const uiStore = useUIStore();
    const user: User = mockUser;
    const isAddDreamOpen = ref(false);

    const openAddDream = () => {
      isAddingDream.value = true;
      uiStore.hideSidebar(); // Cacher la sidebar
    };

    const closeAddDream = () => {
      isAddingDream.value = false;
      uiStore.showSidebar(); // Afficher la sidebar
    };

    return {
      user,
      isAddDreamOpen,
      openAddDream,
      closeAddDream,
      isAddingDream,
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
  text-align: center;

  h2 {
    color: $color-heading-primary;
    margin-bottom: 1em;
  }

  p {
    font-size: 1.1em;
    color: $color-text-secondary;
    margin-bottom: 2em;
  }

  .add-dream-button {
    @include button($color-button-primary, $color-button-primary-text);
    padding: 0.75em 1.5em;
    font-size: 1em;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: color.scale($color-button-primary, $lightness: -10%);
    }
  }

  .dream-list {
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: 100%;
    max-width: 800px;
    margin: 2em auto;

    .dream-card {
      background-color: $color-card-background;
      padding: 1.5em;
      border-radius: $border-radius;
      box-shadow: $box-shadow;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
      }

      h3 {
        margin: 0 0 0.5em 0;
        color: $color-heading-primary;
        font-size: 1.4em;
      }

      p {
        color: $color-text-secondary;
        margin: 0.5em 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4; // Limiter à 4 lignes
        -webkit-box-orient: vertical;
      }

      small {
        display: block;
        color: $color-text-secondary;
        margin-bottom: 0.5em;
      }

      .actions {
        display: flex;
        gap: 0.5em;

        button {
          padding: 0.5em 1em;
          background-color: $color-hover;
          color: #fff;
          border: none;
          border-radius: $border-radius;
          cursor: pointer;
          font-size: 0.9em;
          transition: background-color 0.3s ease;

          &:hover {
            background-color: color.scale($color-hover, $lightness: -10%);
          }
        }
      }
    }
  }

  .back-dashboard-container {
    display: flex;
    justify-content: center;
    margin-top: 2em;

    .back-dashboard {
      @include button($color-button-secondary, $color-button-secondary-text);
      text-decoration: none;
      padding: 0.5em 1em;
      display: flex;
      align-items: center;
      gap: 0.5em;
      cursor: pointer;

      &:hover {
        background-color: color.scale(
          $color-button-secondary,
          $lightness: -10%
        );
      }
    }
  }
}

@media (max-width: 768px) {
  .dream-diaries {
    padding: 1em;

    .dream-list {
      margin: 1em auto;
    }

    .back-dashboard-container {
      .back-dashboard {
        padding: 0.5em 1em;
      }
    }
  }
}
</style>
