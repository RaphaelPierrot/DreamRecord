<!-- src/components/UserPage/DreamDiaries/DreamDiaries.vue -->
<template>
  <div class="dream-diaries">
    <h2>Mes Journaux de Rêves</h2>

    <!-- Composant Tabs -->
    <Tabs>
      <!-- Onglet : Ajouter un Rêve -->
      <Tab name="add" title="Ajouter un Rêve">
        <AddDream @dream-added="handleDreamAdded" />
      </Tab>

      <!-- Onglet : Voir les Rêves -->
      <Tab name="view" title="Voir les Rêves">
        <div class="dream-list" v-if="user.dreams.length > 0">
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
      </Tab>
    </Tabs>

    <!-- Retour au Dashboard -->
    <div class="back-dashboard-container">
      <router-link to="/" class="back-dashboard"
        >← Retour au Dashboard</router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Tabs from "./Tabs.vue";
import Tab from "./Tab.vue";
import AddDream from "./AddDream.vue";
import type { User } from "@/interfaces";
import { mockUser } from "@/data/user";

export default defineComponent({
  name: "DreamDiaries",
  components: {
    Tabs,
    Tab,
    AddDream,
  },
  setup() {
    const user: User = mockUser;

    const handleDreamAdded = () => {
      // Optionnel : Passer automatiquement à l'onglet "Voir les Rêves"
      // Vous pouvez implémenter une logique pour changer l'onglet actif si nécessaire
    };

    const editDream = (id: number) => {
      const dream = user.dreams.find((d) => d.id === id);
      if (dream) {
        // Implémentez une logique d'édition (ex. : ouvrir une modale ou naviguer vers un autre formulaire)
        alert("Fonction d'édition à implémenter.");
      }
    };

    const deleteDream = (id: number) => {
      if (confirm("Voulez-vous vraiment supprimer ce rêve?")) {
        const index = user.dreams.findIndex((d) => d.id === id);
        if (index !== -1) {
          user.dreams.splice(index, 1);
          user.totalDreams -= 1;
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

    return {
      user,
      handleDreamAdded,
      editDream,
      deleteDream,
      formatDate,
    };
  },
});
</script>

<style scoped lang="scss">
.dream-diaries {
  padding: 2em;

  h2 {
    text-align: center;
    color: #333;
    margin-bottom: 1.5em;
  }

  .dream-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5em;
    justify-content: center;
  }

  .dream-card {
    background-color: #fff;
    padding: 1.5em;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    width: 300px;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    h3 {
      margin: 0 0 0.5em 0;
      color: #007bff;
      font-size: 1.4em;
    }

    p {
      color: #555;
      margin: 0.5em 0;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4; /* Limiter à 4 lignes */
      -webkit-box-orient: vertical;
    }

    small {
      display: block;
      color: #888;
      margin-bottom: 0.5em;
    }

    .actions {
      display: flex;
      gap: 0.5em;

      button {
        padding: 0.5em 1em;
        background-color: #6c757d;
        color: #fff;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 0.9em;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #5a6268;
        }
      }
    }
  }

  .back-dashboard-container {
    display: flex;
    justify-content: center;
    margin-top: 2em;

    .back-dashboard {
      padding: 0.5em 1.5em;
      background-color: #28a745;
      color: #fff;
      border: none;
      border-radius: 8px;
      text-decoration: none;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #218838;
      }
    }
  }
}

@media (max-width: 768px) {
  .dream-diaries {
    padding: 1em;

    .dream-list {
      flex-direction: column;
      align-items: center;
    }

    .dream-card {
      width: 100%;
    }

    .back-dashboard-container {
      .back-dashboard {
        width: 100%;
        text-align: center;
      }
    }
  }
}
</style>
