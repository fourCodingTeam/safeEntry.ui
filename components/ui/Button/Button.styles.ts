import styled from "styled-components/native";
import { theme } from "@/constants/theme";
import Animated from "react-native-reanimated";

export const ButtonContainer = styled(Animated.View)`
  align-items: center;
  justify-content: center;
  width: 100vw;
  padding: ${theme.sizes.md};
  border-radius: ${theme.sizes.lg};
`;

export const ButtonText = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.sizes.md};
`;
