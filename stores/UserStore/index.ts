import { create } from "zustand";
import { UserState } from "./@types";

export const useUserStore = create<UserState>((set) => ({
  username: null,
  setUsername: (username: string | null) => set({ username: username }),
}));
