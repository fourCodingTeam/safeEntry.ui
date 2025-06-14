export interface DeniedModalProps {
  visible: boolean;
  onClose: () => void;
  resetScanner: () => void;
  message: string;
}
