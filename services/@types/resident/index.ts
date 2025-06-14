export type createResidentRequest = {
  token: string;
  name: string;
  phoneNumber: number;
  condominiumId: number;
  homeStreet?: string;
  homeNumber: number;
  email: string;
  password: string;
  isHomeOwner: boolean;
};

export type createResidentResponse = {
  id: number;
  name: string;
  phoneNumber: number;
  isHomeOwner: boolean;
  status: number;
};
