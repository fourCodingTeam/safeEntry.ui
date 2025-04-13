import styled from "styled-components/native";
import { theme } from "@/constants/theme";

export const InputWrapper = styled.View`
  width: 100%;
  margin-bottom: ${theme.sizes.sm};
`;

export const StyledTextInput = styled.TextInput`
  padding: ${theme.sizes.sm};
  border-radius: ${theme.sizes.mdMax};
  border: 1px solid ${theme.colors.black40};
  color: ${theme.colors.black};
`;

export const PickerWrapper = styled.View`
  position: relative;
`;

export const SelectButton = styled.TouchableOpacity`
  padding: ${theme.sizes.sm};
  border-radius: ${theme.sizes.mdMax};
  border: 1px solid ${theme.colors.black40};
  background-color: ${theme.colors.white};
`;

export const SelectButtonText = styled.Text`
  color: ${theme.colors.black};
`;

export const OptionList = styled.View`
  border: 1px solid ${theme.colors.black40};
  border-radius: ${theme.sizes.md};
  margin-top: 1px;
  border-bottom: 1px solid ${theme.colors.black40};
  background-color: ${theme.colors.white};
`;

interface OptionItemProps {
  isLast?: boolean;
}

interface OptionItemProps {
  isLast?: boolean;
}

export const OptionItem = styled.TouchableOpacity<OptionItemProps>`
  padding: ${theme.sizes.sm};
  border-bottom-width: ${({ isLast }: OptionItemProps) =>
    isLast ? "0px" : "1px"};
  border-bottom-color: ${theme.colors.black40};
`;
