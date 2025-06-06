import { theme } from "@/constants/theme";
import styled from "styled-components/native";

interface TagWrapperProps {
  color: string;
}

export const InviteCardWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.colors.white};
  width: 100%;
  height: 82px;
  align-items: center;
  border: 1px solid ${theme.colors.black40};
  border-radius: ${theme.sizes.md};
  padding: ${theme.sizes.md} ${theme.sizes.md};
  margin-bottom: ${theme.sizes.sm};
  elevation: 1;
`;

export const PersonInfoWrapper = styled.View`
  height: 100%;
  align-items: flex-start;
  justify-content: space-between;
`;

export const StatusWrapper = styled.View`
  height: 100%;
  align-items: flex-end;
  justify-content: space-between;
`;

export const StyledDateString = styled.Text`
  color: ${theme.colors.midnight60};
  font-family: ${theme.fonts.poppinsNormal};
  font-size: ${theme.sizes.md};
`;

export const TagWrapper = styled.View<TagWrapperProps>`
  align-items: center;
  justify-content: center;
  padding: 0 ${theme.sizes.sm};
  background-color: ${({ color }: TagWrapperProps) => color};
  border-radius: ${theme.sizes.lg};
`;

export const TagText = styled.Text`
  font-family: ${theme.fonts.poppinsNormal};
  color: ${theme.colors.white};
  font-size: ${theme.sizes.md};
`;
