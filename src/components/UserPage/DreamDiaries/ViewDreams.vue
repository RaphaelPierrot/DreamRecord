<!-- src/components/UserPage/ViewDreams.vue -->
<template>
  <div class="dream-list" v-if="user.dreams!.length > 0">
    <div class="dream-card" v-for="dream in user.dreams" :key="dream.id">
      <h3>{{ dream.title }}</h3>
      <p>{{ dream.description }}</p>
      <small>{{ formatDate(dream.date) }}</small>
      <div class="actions">
        <button @click="editDream(dream.id)">Éditer</button>
        <button @click="deleteDream(dream.id)">Supprimer</button>
      </div>
    </div>
  </div>
  <p v-else>Aucun rêve enregistré. Ajoutez votre premier rêve!</p>
</template>

<script lang="ts" setup>
import type { User } from "@/Interfaces";
import { mockUser } from "@/data/user";

const user: User = mockUser;

const editDream = (id: number) => {
  const dream = user.dreams!.find((d) => d.id === id);
  if (dream) {
    const updatedTitle = prompt("Modifier le titre:", dream.title);
    const updatedDescription = prompt(
      "Modifier la description:",
      dream.description
    );
    const updatedDate = prompt("Modifier la date (YYYY-MM-DD):", dream.date);
    if (updatedTitle && updatedDescription && updatedDate) {
      const wordCount = updatedDescription.trim().split(/\s+/).length;
      if (wordCount < 10 || wordCount > 30) {
        alert("La description doit contenir entre 10 et 30 mots.");
        return;
      }

      dream.title = updatedTitle;
      dream.description = updatedDescription;
      dream.date = updatedDate;
    }
  }
};

const deleteDream = (id: number) => {
  if (confirm("Voulez-vous vraiment supprimer ce rêve?")) {
    const index = user.dreams!.findIndex((d) => d.id === id);
    if (index !== -1) {
      user.dreams?.splice(index, 1);
    }
  }
};

const formatDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString(undefined, options);
};
</script>

<style scoped lang="scss">
@use "sass:color";
@use "@/scss/variables.scss" as *;
@use "@/scss/mixins.scss" as *;

.dream-list {
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 100%;
  max-width: 800px;

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
          background-color: color.adjust($color-hover, $lightness: -10%);
        }
      }
    }
  }
}

p {
  font-size: 1.1em;
  color: $color-text-secondary;
  text-align: center;
}
</style>
