import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ToastContainer, ToastText } from "./Toast.styles";
import { ToastProps } from "./Toast.types";

const screenWidth = Dimensions.get("window").width;

export const Toast = ({
  message,
  duration = 3000,
  onFinish,
  type = "neutral",
}: ToastProps) => {
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(0, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    });
    opacity.value = withTiming(1, { duration: 150 });

    const timeout = setTimeout(() => {
      translateY.value = withTiming(-50, { duration: 300 }, () => {
        runOnJS(onFinish)();
      });
      opacity.value = withTiming(0, { duration: 150 });
    }, duration);

    return () => clearTimeout(timeout);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <ToastContainer as={Animated.View} style={animatedStyle} type={type}>
      <ToastText type={type}>{message}</ToastText>
    </ToastContainer>
  );
};
