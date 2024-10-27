<!-- src/components/UserPage/DreamDiaries/AddDreamForm.vue -->
<template>
  <div class="add-dream-form">
    <form @submit.prevent="submitForm">
      <div class="form-section">
        <label for="who">Qui ?</label>
        <input
          id="who"
          v-model="form.who"
          type="text"
          placeholder="Ex. : Moi-même, un ami, etc."
          required
        />
      </div>

      <div class="form-section">
        <label for="what">Quoi ?</label>
        <textarea
          id="what"
          v-model="form.what"
          placeholder="Décrivez les actions ou événements principaux"
          required
        ></textarea>
      </div>

      <div class="form-section">
        <label for="where">Où ?</label>
        <input
          id="where"
          v-model="form.where"
          type="text"
          placeholder="Lieu ou environnement du rêve"
          required
        />
      </div>

      <div class="form-section">
        <label for="duration">Durée Estimée</label>
        <select id="duration" v-model="form.duration" required>
          <option value="" disabled>Choisissez une durée</option>
          <option value="Moins de 5 minutes">Moins de 5 minutes</option>
          <option value="5-15 minutes">5-15 minutes</option>
          <option value="Plus de 15 minutes">Plus de 15 minutes</option>
        </select>
      </div>

      <div class="form-section">
        <label for="emotions">Comment vous êtes-vous senti ?</label>
        <select id="emotions" v-model="form.emotions" required>
          <option value="" disabled>Choisissez une émotion</option>
          <option value="Heureux">Heureux</option>
          <option value="Anxieux">Anxieux</option>
          <option value="Triste">Triste</option>
          <option value="Excité">Excité</option>
          <option value="Autre">Autre</option>
        </select>
        <input
          v-if="form.emotions === 'Autre'"
          type="text"
          v-model="form.emotions"
          placeholder="Décrivez votre émotion"
        />
      </div>

      <div class="form-section">
        <label for="category">Catégorie</label>
        <select id="category" v-model="form.category" required>
          <option value="" disabled>Choisissez une catégorie</option>
          <option value="Aventure">Aventure</option>
          <option value="Cauchemar">Cauchemar</option>
          <option value="Lucide">Lucide</option>
          <option value="Symbolique">Symbolique</option>
          <option value="Autre">Autre</option>
        </select>
        <input
          v-if="form.category === 'Autre'"
          type="text"
          v-model="form.category"
          placeholder="Décrivez la catégorie"
        />
      </div>

      <div class="form-section">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="form.description"
          placeholder="Description détaillée du rêve (10-30 mots)"
          required
        ></textarea>
      </div>

      <button type="submit" class="submit-btn">Soumettre le Rêve</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import type { Dream } from "@/interfaces";
import { mockUser } from "@/data/user";

export default defineComponent({
  name: "AddDreamForm",
  emits: ["dream-added"],
  setup(_, { emit }) {
    const user = mockUser;

    const form = reactive<Dream>({
      id: Date.now(),
      title: "",
      description: "",
      date: "",
      emotions: "",
      category: "",
      duration: "",
      who: "",
      what: "",
      where: "",
    });

    const error = ref("");

    const submitForm = () => {
      const wordCount = form.description.trim().split(/\s+/).length;
      if (wordCount < 10 || wordCount > 30) {
        error.value = "La description doit contenir entre 10 et 30 mots.";
        return;
      }

      if (form.emotions === "Autre") {
        form.emotions = form.emotions;
      }

      if (form.category === "Autre") {
        form.category = form.category;
      }

      // Ajouter le rêve
      user.dreams.push({ ...form, id: Date.now() });
      user.totalDreams += 1;

      // Réinitialiser le formulaire
      Object.assign(form, {
        id: Date.now(),
        title: "",
        description: "",
        date: "",
        emotions: "",
        category: "",
        duration: "",
        who: "",
        what: "",
        where: "",
        customEmotion: "",
        customCategory: "",
      });

      error.value = "";
      emit("dream-added");
    };

    return {
      form,
      submitForm,
      error,
    };
  },
});
</script>

<style scoped lang="scss">
.add-dream-form {
  form {
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    max-width: 800px;
    margin: 0 auto;
    padding: 2em;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    animation: fadeIn 1s ease-in-out;

    .form-section {
      display: flex;
      flex-direction: column;

      label {
        margin-bottom: 0.5em;
        font-weight: bold;
        color: #333;
      }

      input,
      textarea,
      select {
        padding: 0.75em;
        border: 1px solid #ccc;
        border-radius: 8px;
        font-size: 1em;
        transition: border-color 0.3s ease;

        &:focus {
          border-color: #007bff;
          outline: none;
        }
      }

      input[type="text"] {
        display: block;
        margin-top: 0.5em;
      }
    }

    .submit-btn {
      padding: 0.75em 1.5em;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1em;
      transition: background-color 0.3s ease;
      align-self: flex-end;

      &:hover {
        background-color: #0056b3;
      }
    }

    .error {
      color: red;
      text-align: center;
      font-size: 0.9em;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
