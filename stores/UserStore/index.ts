import { create } from "zustand";
import { UserState } from "./@types";

export const useUserStore = create<UserState>((set) => ({
  username: null,
  setUsername: (username: string | null) => set({ username: username }),
  role: null,
  setRole: (role: string | null) => set({ role: role }),
  token: null,
  setToken: (token: string | null) => set({ token: token }),
  personId: null,
  setPersonId: (personId: number | null) => set({ personId: personId }),
  statusId: null,
  setStatusId: (statusId: number | null) => set({ statusId: statusId }),
}));
