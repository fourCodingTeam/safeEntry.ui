import { create } from "zustand";
import { AddressState } from "./@types";

export const useAddressStore = create<AddressState>((set) => ({
  addressId: null,
  setAddressId: (addressId: number | null) => set({ addressId: addressId }),
  houseNumber: null,
  setHouseNumber: (houseNumber: number | null) =>
    set({ houseNumber: houseNumber }),
}));
