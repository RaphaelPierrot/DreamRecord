<!-- src/components/Dashboard/DashboardCard.vue -->
<template>
  <div class="dashboard-card">
    <div class="icon">
      <font-awesome-icon :icon="icon" />
    </div>
    <div class="content">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      <router-link :to="link" class="card-link">Accéder</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default defineComponent({
  name: "DashboardCard",
  components: {
    FontAwesomeIcon,
  },
  props: {
    icon: {
      type: [String, Array],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
/* src/components/Dashboard/DashboardCard.vue */
@use "sass:color";
@use "@/scss/variables.scss" as *;
@use "@/scss/mixins.scss" as *;

.dashboard-card {
  width: 300px; // Taille fixe
  height: 200px; // Taille fixe
  background-color: $color-card-background;
  padding: 1.5em; // Ajout de padding
  border-radius: 12px;
  box-shadow: $box-shadow;
  display: flex;
  align-items: center; // Aligner verticalement les éléments
  gap: 1em;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .icon {
    font-size: 2.5em;
    color: $color-heading-secondary;
    flex-shrink: 0;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center; // Centrer le contenu horizontalement
    text-align: center; // Centrer le texte
    flex: 1;
    padding: 0 1em; // Ajout de padding horizontal

    h3 {
      margin: 0;
      font-size: 1.2em;
      color: $color-heading-primary;
      margin-bottom: 0.5em;
    }

    p {
      flex-grow: 1;
      color: $color-text-secondary;
      margin: 0.5em 0;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4; // Limiter à 4 lignes
      -webkit-box-orient: vertical;
    }

    .card-link {
      @include button($color-button-primary, $color-button-primary-text);
      text-decoration: none;
      align-self: center; // Centrer le lien

      &:hover {
        background-color: color.adjust($color-button-primary, $lightness: -10%);
      }
    }
  }
}
</style>
