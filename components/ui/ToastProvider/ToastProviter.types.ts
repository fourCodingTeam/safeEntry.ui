export type ToastTypes = "success" | "error" | "neutral";

export interface ToastContextProps {
  show: (message: string, duration?: number, type?: ToastTypes) => void;
}
