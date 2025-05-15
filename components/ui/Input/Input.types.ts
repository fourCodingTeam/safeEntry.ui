export type InputType = "text" | "select" | "date";

export interface InputProps {
  type: InputType;
  value: string | Date;
  label?: string;
  placeholder?: string;
  onChange: (value: string | Date) => void;
  options?: {
    label: string;
    value: string;
  }[];
  disabled?: boolean;
  isPassword?: boolean;
}
