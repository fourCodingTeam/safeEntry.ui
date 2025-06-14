import { Tabs, useRouter } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/ui";
import { theme } from "@/constants/theme";
import { useCameraStore } from "@/stores/CameraStore";
import { Pressable } from "react-native";

export default function AppStack() {
  const { setIsOpen } = useCameraStore();
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        tabBarIconStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: theme.colors.white,
          display: "flex",
          position: "absolute",
          alignItems: "center",
          justifyContent: "space-around",
          height: 64,
          marginHorizontal: 18,
          bottom: 18,
          elevation: 24,
          borderTopWidth: 1,
          borderWidth: 1,
          borderColor: theme.colors.placeholder,
          borderRadius: 32,
          overflow: "hidden",
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} iconName={"house"} />
          ),
          title: "",
          tabBarButton: (props) => (
            <Pressable {...props} android_ripple={null} />
          ),
        }}
      />
      <Tabs.Screen
        name="formulario"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} iconName={"plus"} />
          ),
          title: "",
          tabBarButton: (props) => (
            <Pressable {...props} android_ripple={null} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} iconName={"qr"} />
          ),
          title: "",
          tabBarButton: (props) => (
            <Pressable
              {...props}
              android_ripple={null}
              onPress={() => {
                setIsOpen(true);
                router.push("/(admin)/scan");
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="historico"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} iconName={"ticket"} />
          ),
          title: "",
          tabBarButton: (props) => (
            <Pressable {...props} android_ripple={null} />
          ),
        }}
      />
      <Tabs.Screen
        name="historicoAprovados"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} iconName={"clock"} />
          ),
          title: "",
          tabBarButton: (props) => (
            <Pressable {...props} android_ripple={null} />
          ),
        }}
      />
    </Tabs>
  );
}
