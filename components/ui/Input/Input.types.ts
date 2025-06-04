export type InputType = "text" | "select" | "date";

export interface InputProps {
  type: InputType;
  value: string | Date | number;
  label?: string;
  placeholder?: string;
  onChange: (value: string | Date | number) => void;
  options?: {
    label: string;
    value: string | number;
  }[];
  disabled?: boolean;
  isPassword?: boolean;
}
