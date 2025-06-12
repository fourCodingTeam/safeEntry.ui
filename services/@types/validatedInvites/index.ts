export type ValidatedInvitesResponse = {
  id: string;
  addressId: number;
  condominiumId: number;
  homeDescription: string;
  createdByResidentId: number;
  createdByResidentName: string;
  visitorId: number;
  visitorName: string;
  employeeId: number;
  employeeName: string;
  code: number;
  inviteExpirationDate: string;
  validatedAt: string;
  approval: boolean;
};
