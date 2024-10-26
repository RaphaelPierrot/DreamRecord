<!-- src/components/UserPage/AddDream.vue -->
<template>
  <form @submit.prevent="addDream" class="dream-form">
    <input
      v-model="newDream.title"
      type="text"
      placeholder="Titre du rêve"
      required
    />
    <textarea
      v-model="newDream.description"
      placeholder="Description du rêve (10-30 mots)"
      required
    ></textarea>
    <input v-model="newDream.date" type="date" required />
    <button type="submit">Ajouter</button>
    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import type { Dream } from "@/interfaces";
import { mockUser } from "@/data/user";

export default defineComponent({
  name: "AddDream",
  emits: ["dream-added"],
  setup(_, { emit }) {
    const user = mockUser;

    const newDream = ref<Dream>({
      id: Date.now(),
      title: "",
      description: "",
      date: "",
    });

    const error = ref("");

    const addDream = () => {
      const wordCount = newDream.value.description.trim().split(/\s+/).length;
      if (wordCount < 10 || wordCount > 30) {
        error.value = "La description doit contenir entre 10 et 30 mots.";
        return;
      }

      if (
        newDream.value.title &&
        newDream.value.description &&
        newDream.value.date
      ) {
        user.dreams?.push({ ...newDream.value, id: Date.now() });
        user.totalDreams += 1;
        // Réinitialiser le formulaire
        newDream.value = {
          id: Date.now(),
          title: "",
          description: "",
          date: "",
        };
        error.value = "";
        emit("dream-added");
      }
    };

    return {
      newDream,
      addDream,
      error,
    };
  },
});
</script>

<style scoped lang="scss">
@use "sass:color";
@use "@/scss/variables.scss" as *;
@use "@/scss/mixins.scss" as *;

.dream-form {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  max-width: 600px;
  width: 100%;

  input,
  textarea {
    padding: 0.75em;
    border: 1px solid $color-border;
    border-radius: $border-radius;
    font-size: 1em;
    resize: vertical;
  }

  textarea {
    height: 150px;
  }

  button {
    align-self: flex-end;
    padding: 0.75em 1.5em;
    background-color: $color-button-primary;
    color: $color-button-primary-text;
    border: none;
    border-radius: $border-radius;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: color.adjust($color-button-primary, $lightness: -10%);
    }
  }

  .error {
    color: red;
    font-size: 0.9em;
    text-align: center;
  }
}
</style>
