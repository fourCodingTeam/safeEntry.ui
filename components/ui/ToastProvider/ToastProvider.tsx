import React, { createContext, ReactNode, useContext, useState } from "react";
import { View } from "react-native";
import { Toast } from "../Toast";
import { ToastContextProps, ToastTypes } from "./ToastProviter.types";

const ToastContext = createContext<ToastContextProps>({
  show: () => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [type, setType] = useState<ToastTypes>("neutral");

  const show = (message: string, duration?: number, type?: ToastTypes) => {
    setToastMessage(message);
    setDuration(duration || 3000);
    setType(type || "neutral");
  };

  return (
    <ToastContext.Provider value={{ show }}>
      <View style={{ flex: 1, zIndex: 9999 }} pointerEvents="box-none">
        {children}
      </View>
      {toastMessage && (
        <Toast
          message={toastMessage}
          duration={duration}
          type={type}
          onFinish={() => setToastMessage(null)}
        />
      )}
    </ToastContext.Provider>
  );
};
