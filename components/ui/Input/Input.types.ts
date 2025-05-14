export type InputType = "text" | "select" | "date";

export interface InputProps {
  type: InputType;
  value: string;
  label?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  options?: {
    label: string;
    value: string;
  }[];
  disabled?: boolean;
  isPassword?: boolean;
}
