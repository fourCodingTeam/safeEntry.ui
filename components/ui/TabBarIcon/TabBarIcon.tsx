import { theme } from "@/constants/theme";
import React from "react";
import { View } from "react-native";
import { TabBarIconProps } from "./TabBarIcon.types";
import { Icon } from "../Icon";

export function TabBarIcon({ focused, iconName }: TabBarIconProps) {
  return (
    <View
      style={
        focused
          ? {
              backgroundColor: theme.colors.blue,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              borderRadius: 28,
            }
          : {
              backgroundColor: theme.colors.white,
            }
      }
    >
      <Icon
        name={iconName}
        color={focused ? theme.colors.white : theme.colors.midnight}
      />
    </View>
  );
}
