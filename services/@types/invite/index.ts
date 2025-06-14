export type InviteRequestByResidentId = {
  residentId: number;
};

export type InviteGenerateRequest = {
  residentId: number;
  visitorName: string;
  visitorPhoneNumber: number;
  startDate: Date;
  daysToExpiration: number;
  justification: string;
};

export type InviteGenerateResponse = {
  code: number;
};

export type InviteResponse = {
  code: number;
  residentId: number;
  addressId: number;
  visitorId: number;
  visitorName: string;
  createdAt: string;
  startDate: string;
  expirationDate: string;
  daysToExpiration: number;
  justification: string;
  isActive: boolean;
};

export type InviteValidateRequest = {
  addressId: number;
  visitorId: number;
  employeeId: number;
  code: number;
  dateNow: Date;
};

export type InviteChangeStatusRequest = {
  addressId: number;
  visitorId: number;
  code: number;
};
