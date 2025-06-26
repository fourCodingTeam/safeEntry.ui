import { theme } from "@/constants/theme";
import styled from "styled-components/native";
interface OptionItemProps {
  isLast?: boolean;
}

interface OptionItemProps {
  isLast?: boolean;
}

export const InputWrapper = styled.View`
  width: 100%;
`;
export const TextInputWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-height: 200px;
  border-radius: ${theme.sizes.sm};
  border: 1px solid ${theme.colors.placeholder};
  color: ${theme.colors.black60};
  font-size: ${theme.sizes.md};
  background-color: ${theme.colors.white};
`;
export const StyledTextInput = styled.TextInput`
  flex: 1;
  padding: ${theme.sizes.md};
  border-radius: ${theme.sizes.sm};
  border: none;
  color: ${theme.colors.black60};
  font-size: ${theme.sizes.md};
  background-color: ${theme.colors.white};
`;

export const PickerWrapper = styled.View`
  position: relative;
`;

export const StyledSelectInput = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.sizes.md};
  border-radius: ${theme.sizes.sm};
  border: 1px solid ${theme.colors.placeholder};
  background-color: ${theme.colors.white};
  font-size: ${theme.sizes.md};
`;

export const StyledSelectInputText = styled.Text`
  color: ${theme.colors.placeholder};
  font-size: ${theme.sizes.md};
`;

export const OptionList = styled.ScrollView`
  width: 100%;
  max-height: 200px;
  border: 1px solid ${theme.colors.black40};
  border-radius: ${theme.sizes.sm};
  border-bottom: 1px solid ${theme.colors.black40};
  background-color: ${theme.colors.white};
`;

export const OptionItem = styled.TouchableOpacity<OptionItemProps>`
  padding: ${theme.sizes.md};
  border-bottom-width: ${({ isLast }: OptionItemProps) =>
    isLast ? "0px" : "1px"};
  border-bottom-color: ${theme.colors.black40};
  font-size: ${theme.sizes.md};
`;

export const Subtitle = styled.Text`
  font-size: ${theme.sizes.md};
  font-family: ${theme.fonts.poppinsNormal};
  color: ${theme.colors.black};
`;
