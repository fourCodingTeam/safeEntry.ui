import { ToastProvider } from "@/components/ui";
import "@/i18n";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

export default function RootLayout() {
  const [loaded] = useFonts({
    PoppinsNormal: require("@/assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("@/assets/fonts/Poppins-Medium.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ToastProvider>
      <Stack screenOptions={{ statusBarStyle: "dark", headerShown: false }} />
    </ToastProvider>
  );
}
