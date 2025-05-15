export interface DetailedInviteProps {
  visible: boolean;
  active: boolean;
  visitStartDate: Date;
  visitEndDate: Date;
  duration: number;
  actualDuration: number;
  visitReason: string;
  onClose: () => void;
  invitedPersonName?: string;
}
