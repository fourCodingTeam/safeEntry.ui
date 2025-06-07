export type AddressType = {
  houseNumber: number;
};

export type AddressRequest = {
  employeeId: number;
};

export type AddressResponse = {
  id: number;
  homeStreet: string | null;
  homeNumber: number;
  condominiumName: string;
  houseOwnerId: number;
  residents: {
    id: number;
    name: string;
    phoneNumber: number;
    isHomeOwner: boolean;
    status: number;
  }[];
};

export type InviteCount = {
  count: number;
};
