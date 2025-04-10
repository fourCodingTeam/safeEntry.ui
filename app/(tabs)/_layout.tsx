import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/ui";
import { theme } from "@/constants/theme";

export default function AppStack() {
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
        }}
      />
      <Tabs.Screen
        name="formulario"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} iconName={"plus"} />
          ),
        }}
      />
      <Tabs.Screen
        name="historico"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} iconName={"clock"} />
          ),
        }}
      />
    </Tabs>
  );
}
