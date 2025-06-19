export interface DetailedInviteProps {
  code: number;
  condominiumId?: number;
  homeDescription?: string;
  createdByResidentId: number;
  createdByResidentName?: string;
  visitorId: number;
  visitorName?: string;
  employeeId?: number;
  employeeName?: string;
  inviteExpirationDate?: string;
  validatedAt?: string;
  approval?: boolean;
  visible: boolean;
  onClose: () => void;
}
