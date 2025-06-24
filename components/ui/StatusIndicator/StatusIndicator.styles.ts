import { theme } from "@/constants/theme";
import styled from "styled-components/native";

export const StatusWrapper = styled.TouchableOpacity`
  width: 100%;
  padding: 0 ${theme.sizes.md};
`;
export const StatusCard = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${theme.sizes.md};
  padding-vertical: ${theme.sizes.sm};
  border-radius: ${theme.sizes.md};
  border: 1px solid ${theme.colors.black40};
`;
export const StyledEmoji = styled.Text`
  font-size: ${theme.sizes.lg};
  line-height: 38px;
`;
export const StatusTextWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${theme.sizes.sm};
`;
export const EditButton = styled.View`
  background-color: ${theme.colors.black};
  padding: ${theme.sizes.sm};
  border-radius: ${theme.sizes.sm};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${theme.sizes.sm};
`;
export const StyledStatusText = styled.Text`
  font-size: ${theme.sizes.md};
  font-family: ${theme.fonts.poppinsNormal};
  color: ${theme.colors.black};
`;
export const StyledEditText = styled.Text`
  font-size: ${theme.sizes.smMax};
  font-family: ${theme.fonts.poppinsNormal};
  color: ${theme.colors.white};
`;
