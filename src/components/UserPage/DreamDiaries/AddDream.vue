<!-- src/components/UserPage/DreamDiaries/AddDream.vue -->
<template>
  <div class="scroll-wrapper" ref="scrollWrapper">
    <QuestionSection
      v-for="(q, index) in questions"
      :key="index"
      :question="q.text"
      :type="q.type"
      :options="q.options"
      :backgroundImage="q.background"
      :hasNext="index < questions.length - 1"
      @answer="handleAnswer(index, $event)"
      @next="scrollToNext(index)"
    />
    <div class="final-section">
      <h3>Merci d'avoir partagé votre rêve !</h3>
      <button @click="submitDream">Soumettre</button>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import QuestionSection from "./QuestionSection.vue";
import { useUIStore } from "@/store/uiStore";
import type { User, Dream } from "@/Interfaces";
import { mockUser } from "@/data/user";
import { questions } from "@/data/questions";
export default defineComponent({
  name: "AddDream",
  components: {
    QuestionSection,
  },
  setup(_, { emit }) {
    const uiStore = useUIStore();
    const user: User = mockUser;

    const newDream = ref<Dream>({
      id: Date.now(),
      title: "",
      description: "",
      date: "",
      emotions: "",
      category: "",
      duration: "",
      characters: [],
      location: "",
    });

    const error = ref("");

    const scrollWrapper = ref<HTMLElement | null>(null);

    const handleAnswer = (index: number, answer: string) => {
      switch (index) {
        case 0:
          if (!newDream.value.characters) newDream.value.characters = [];
          newDream.value.characters.push(answer);
          break;
        case 1:
          newDream.value.description = answer;
          break;
        case 2:
          newDream.value.location = answer;
          break;
        case 3:
          newDream.value.duration = answer;
          break;
        case 4:
          newDream.value.emotions = answer;
          break;
        default:
          break;
      }
    };

    const scrollToNext = (index: number) => {
      if (scrollWrapper.value) {
        const nextSection = scrollWrapper.value.children[
          index + 1
        ] as HTMLElement;
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    const submitDream = () => {
      if (
        newDream.value.title &&
        newDream.value.description &&
        newDream.value.date &&
        newDream.value.emotions &&
        newDream.value.location &&
        newDream.value.duration
      ) {
        user.dreams?.push({ ...newDream.value, id: Date.now() });
        // Réinitialiser le formulaire
        newDream.value = {
          id: Date.now(),
          title: "",
          description: "",
          date: "",
          emotions: "",
          category: "",
          duration: "",
          characters: [],
          location: "",
        };
        error.value = "";
        uiStore.showSidebar(); // Afficher la sidebar après soumission
        emit("close");
      } else {
        error.value = "Veuillez remplir tous les champs obligatoires.";
      }
    };

    const closeForm = () => {
      uiStore.showSidebar(); // Afficher la sidebar lorsque le formulaire est fermé
      emit("close");
    };

    // Masquer la sidebar lors de l'ouverture du formulaire
    uiStore.hideSidebar();

    return {
      user,
      newDream,
      submitDream,
      error,
      questions,
      scrollWrapper,
      handleAnswer,
      scrollToNext,
      closeForm,
    };
  },
});
</script>

<style scoped lang="scss">
@use "sass:color";
@use "@/scss/variables.scss" as *;
@use "@/scss/mixins.scss" as *;

.add-dream-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.5s ease-in-out;
}

.add-dream-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .close-button {
    position: absolute;
    top: 1em;
    right: 1em;
    background: none;
    border: none;
    font-size: 1.5em;
    cursor: pointer;
    color: $color-text-secondary;
    transition: color 0.3s ease;

    &:hover {
      color: $color-heading-primary;
    }
  }

  .scroll-wrapper {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    scroll-behavior: smooth;
    height: 100%;
    padding: 2em;
  }

  .final-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2em;

    h3 {
      margin-bottom: 1em;
      color: $color-heading-primary;
    }

    button {
      @include button($color-button-primary, $color-button-primary-text);
      padding: 0.75em 1.5em;
      font-size: 1em;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: color.scale($color-button-primary, $lightness: -10%);
      }
    }

    .error {
      color: red;
      font-size: 0.9em;
      margin-top: 1em;
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
