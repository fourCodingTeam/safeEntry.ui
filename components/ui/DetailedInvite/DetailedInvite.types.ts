export interface DetailedInviteProps {
  code: number;
  visitorId: number;
  residentId: number;
  visible: boolean;
  onClose: () => void;
}
