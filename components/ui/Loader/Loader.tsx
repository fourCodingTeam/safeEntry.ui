import { theme } from "@/constants/theme";
import React from "react";
import { ActivityIndicator, View } from "react-native";

export function Loader() {
  return (
    <View
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 150,
      }}
    >
      <ActivityIndicator color={theme.colors.blue} size={32} />
    </View>
  );
}
