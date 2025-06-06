export type createResidentRequest = {
  name: string;
  phoneNumber: number;
  condominiumId: number;
  homeStreet?: string;
  homeNumber: number;
  email: string;
  password: string;
};
