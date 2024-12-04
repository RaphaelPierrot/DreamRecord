// src/interfaces/user.ts

import type { Dream } from "./dream";
import type { Notification } from "./notification";
import type { Advice } from "./advice";
import type { Analyse } from "./analyse";
export interface User {
  id: number;
  username: string;
  email: string;
  profile_image?: string;
  daily_advice?: string;
  dreams?: Dream[];
  notifications?: Notification[];
  analyses?: Analyse[];
  advices?: Advice[];
}
