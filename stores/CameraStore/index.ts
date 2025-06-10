import { create } from "zustand";
import { CameraState } from "./@types";

export const useCameraStore = create<CameraState>((set) => ({
  isOpen: true,
  setIsOpen: (isOpen: boolean) => set({ isOpen: isOpen }),
}));
