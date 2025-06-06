import { ToastProvider } from "@/components/ui";
import "@/i18n";
import { useUserStore } from "@/stores";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-gesture-handler";
import "react-native-reanimated";

export default function RootLayout() {
  const [loaded] = useFonts({
    PoppinsNormal: require("@/assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("@/assets/fonts/Poppins-Medium.ttf"),
  });

  const { username, role } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      if (!username || !role) {
        router.replace("/auth");
      }
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ToastProvider>
      <Stack screenOptions={{ statusBarStyle: "dark", headerShown: false }}>
        {!username || !role ? (
          <Stack.Screen name="auth" options={{ headerShown: false }} />
        ) : role === "admin" ? (
          <Stack.Screen name="(admin)" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        )}
      </Stack>
    </ToastProvider>
  );
}
