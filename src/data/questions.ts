// src/data/questions.t

import type { Question } from "@/Interfaces";

export const questions: Question[] = [
  {
    text: "Qui participait au rêve ?",
    type: "options",
    options: [
      { label: "Moi-même", value: "Moi-même" },
      { label: "Un ami", value: "Un ami" },
      { label: "Inconnu", value: "Inconnu" },
      { label: "Autre", value: "other" },
    ],
    background: "/assets/backgrounds/who.jpg",
  },
  {
    text: "Que s'est-il passé ?",
    type: "textarea",
    background: "/assets/backgrounds/what.jpg",
  },
  {
    text: "Où cela a-t-il eu lieu ?",
    type: "options",
    options: [
      { label: "Maison", value: "Maison" },
      { label: "Travail", value: "Travail" },
      { label: "Lieu Imaginaire", value: "Lieu Imaginaire" },
      { label: "Autre", value: "other" },
    ],
    background: "/assets/backgrounds/where.jpg",
  },
  {
    text: "Quelle était la durée estimée du rêve ?",
    type: "options",
    options: [
      { label: "Moins de 5 minutes", value: "Moins de 5 minutes" },
      { label: "5-15 minutes", value: "5-15 minutes" },
      { label: "Plus de 15 minutes", value: "Plus de 15 minutes" },
    ],
    background: "/assets/backgrounds/duration.jpg",
  },
  {
    text: "Comment vous êtes-vous senti ?",
    type: "checkbox",
    options: [
      { label: "Heureux", value: "Heureux" },
      { label: "Anxieux", value: "Anxieux" },
      { label: "Neutre", value: "Neutre" },
      { label: "Triste", value: "Triste" },
      { label: "Excité", value: "Excité" },
    ],
    background: "/assets/backgrounds/feelings.jpg",
  },
];
