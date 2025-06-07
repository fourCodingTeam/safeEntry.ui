import { theme } from "@/constants/theme";
import styled from "styled-components/native";

export const FormWrapper = styled.View`
  width: 100%;
  gap: ${theme.sizes.md};
`;

export const InputsWrapper = styled.View`
  width: 100%;
  gap: ${theme.sizes.sm};
  padding-horizontal: ${theme.sizes.md};
`;

export const GoBackWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: left;
  justify-content: flex-start;
  padding-horizontal: ${theme.sizes.md};
`;

export const LetterWrapper = styled.View`
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  border-radius: 100px;
  background-color: ${theme.colors.blue};
`;

export const IconLetter = styled.Text`
  color: ${theme.colors.white};
  font-family: ${theme.fonts.poppinsMedium};
  font-size: ${theme.sizes.xl};
  line-height: 165px;
`;

export const StyledGoBackText = styled.Text`
  font-size: ${theme.sizes.md};
  font-family: ${theme.fonts.poppinsNormal};
  color: ${theme.colors.black};
`;

export const StyledGoBackTouchableOpacity = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: ${theme.sizes.sm};
`;
