import { create } from "zustand";
import { UserState } from "./@types";

export const useUserStore = create<UserState>((set) => ({
  username: "",
  setUsername: (username: string) => set({ username: username }),
}));
