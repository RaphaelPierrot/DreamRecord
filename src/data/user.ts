import type { User, Dream } from "../Interfaces";
export const mockDreams: Dream[] = [
  {
    id: 1,
    title: "Vol au-dessus des nuages",
    description: "Je volais librement au-dessus des montagnes et des océans.",
    date: "2024-04-25",
  },
  {
    id: 2,
    title: "Chasse au trésor",
    description:
      "Je cherchais un trésor caché dans une ancienne forêt enchantée.",
    date: "2024-04-20",
  },
  {
    id: 3,
    title: "Rencontre extraterrestre",
    description:
      "J’ai rencontré des êtres d’une autre planète et échangé avec eux.",
    date: "2024-04-15",
  },
];
export const mockUser: User = {
  id: 1,
  username: "JeanDupont",
  email: "jean.dupont@example.com",
  profileImage: "src/assets/default-profile.png",
  totalDreams: 42,
  totalAnalyses: 38,
  totalAdvice: 15,
  dailyAdvice: "Prenez quelques minutes ce soir pour méditer avant de dormir.",
  notifications: [
    { message: "Votre rêve a été analysé", read: false },
    { message: "Nouvelle suggestion disponible", read: false },
    { message: "Mise à jour du système", read: true },
  ],
  dreams: mockDreams,
};
