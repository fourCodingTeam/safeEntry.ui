export interface ToastProps {
  message: string;
  onFinish: () => void;
  duration?: number;
  type?: "success" | "error" | "neutral";
}
