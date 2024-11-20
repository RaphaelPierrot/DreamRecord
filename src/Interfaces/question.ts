export interface Question {
  text: string;
  type: "options" | "textarea" | "checkbox";
  options?: Array<{ label: string; value: string }>;
  background: string;
}
