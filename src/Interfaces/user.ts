// src/interfaces/user.ts

import type { Dream } from "./dream";
import type { Notification } from "./notification";
export interface User {
  id: number;
  username: string;
  email: string;
  profileImage: string;
  totalDreams: number;
  totalAnalyses: number;
  totalAdvice: number;
  notifications: Notification[];
  dailyAdvice: string;
  dreams: Dream[]; // Ajouté pour lier les rêves
}
