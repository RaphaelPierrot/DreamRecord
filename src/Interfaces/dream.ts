// src/interfaces/Dream.ts
export interface Dream {
  id: number;
  title: string;
  description: string;
  date: string;
  emotions?: string;
  category?: string;
  duration?: string;
  characters?: string[];
  location?: string;
}
