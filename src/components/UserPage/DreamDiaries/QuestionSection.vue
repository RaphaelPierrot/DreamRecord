<!-- src/components/UserPage/DreamDiaries/QuestionSection.vue -->
<template>
  <div
    class="question-section"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <div class="content">
      <h3>{{ question }}</h3>

      <!-- Options avec boutons -->
      <div v-if="type === 'options'" class="options">
        <button
          v-for="option in options"
          :key="option.value"
          @click="handleOptionClick(option.value)"
          class="option-button"
        >
          {{ option.label }}
        </button>
      </div>

      <!-- Zone de texte -->
      <div v-else-if="type === 'textarea'" class="textarea-container">
        <textarea
          v-model="textAnswer"
          placeholder="Décrivez votre rêve..."
          @input="handleTextInput"
        ></textarea>
      </div>

      <!-- Options avec cases à cocher -->
      <div v-else-if="type === 'checkbox'" class="checkboxes">
        <label
          v-for="option in options"
          :key="option.value"
          class="checkbox-label"
        >
          <input
            type="checkbox"
            :value="option.value"
            v-model="selectedOptions"
          />
          {{ option.label }}
        </label>
        <button class="next-button" @click="goToNext">Suivant</button>
      </div>

      <!-- Bouton Suivant pour les zones de texte -->
      <button
        v-if="type === 'textarea' && hasNext"
        class="next-button"
        @click="goToNext"
        :disabled="!textAnswer.trim()"
      >
        Suivant
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "QuestionSection",
  props: {
    question: {
      type: String,
      required: true,
    },
    type: {
      type: String as () => "options" | "textarea" | "checkbox",
      required: true,
    },
    options: {
      type: Array as () => Array<{ label: string; value: string }>,
      default: () => [],
    },
    backgroundImage: {
      type: String,
      default: "",
    },
    hasNext: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["answer", "next"],
  setup(props, { emit }) {
    const showTextInput = ref(false);
    const customAnswer = ref("");
    const textAnswer = ref("");
    const selectedOptions = ref<string[]>([]);

    const handleOptionClick = (value: string) => {
      if (value === "other") {
        showTextInput.value = true;
      } else {
        emit("answer", value);
        emit("next");
      }
    };

    const handleTextInput = () => {
      emit("answer", textAnswer.value.trim());
    };

    const goToNext = () => {
      if (props.type === "textarea" && textAnswer.value.trim() !== "") {
        emit("answer", textAnswer.value.trim());
      } else if (props.type === "checkbox") {
        emit("answer", selectedOptions.value);
      }
      emit("next");
    };

    watch(selectedOptions, () => {
      // Émettre la réponse lorsque les options sont modifiées
      emit("answer", selectedOptions.value);
    });

    return {
      showTextInput,
      customAnswer,
      textAnswer,
      selectedOptions,
      handleOptionClick,
      handleTextInput,
      goToNext,
    };
  },
});
</script>

<style scoped lang="scss">
.question-section {
  background-size: cover;
  background-position: center;
  padding: 2em;
  color: #fff;
  text-align: center;
  min-height: calc(100vh - 60px); // Ajuster selon la hauteur du header
  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    max-width: 600px;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    padding: 2em;
    border-radius: 10px;

    h3 {
      margin-bottom: 1.5em;
      font-size: 1.8em;
    }

    .options,
    .checkboxes {
      display: flex;
      flex-direction: column;
      gap: 1em;
      align-items: center;

      .option-button {
        padding: 0.75em 1.5em;
        background-color: #ffffff;
        color: #000000;
        border: none;
        border-radius: 30px;
        cursor: pointer;
        font-size: 1.1em;
        width: 100%;
        max-width: 300px;
        transition: background-color 0.3s;

        &:hover {
          background-color: #e0e0e0;
        }
      }

      .checkbox-label {
        display: flex;
        align-items: center;
        font-size: 1.1em;

        input {
          margin-right: 0.5em;
          transform: scale(1.2);
        }
      }

      .next-button {
        margin-top: 1em;
        padding: 0.75em 1.5em;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 30px;
        cursor: pointer;
        font-size: 1.1em;
        width: 100%;
        max-width: 300px;
        transition: background-color 0.3s;

        &:hover {
          background-color: #0056b3;
        }
      }
    }

    .textarea-container {
      display: flex;
      flex-direction: column;
      align-items: center;

      textarea {
        width: 100%;
        max-width: 500px;
        min-height: 150px;
        padding: 1em;
        border-radius: 10px;
        border: none;
        font-size: 1em;
        resize: vertical;
        margin-bottom: 1em;
      }

      .next-button {
        padding: 0.75em 1.5em;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 30px;
        cursor: pointer;
        font-size: 1.1em;
        width: 100%;
        max-width: 300px;
        transition: background-color 0.3s;

        &:hover {
          background-color: #0056b3;
        }

        &:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }
      }
    }
  }
}
</style>
