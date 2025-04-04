import { theme } from "@/constants/theme";
import styled from "styled-components/native";

export const InviteCardWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.colors.white};
  width: 100%;
  height: 82px;
  align-items: center;
  shadowColor: ${theme.colors.blue};
  elevation: 16;
  border-radius: ${theme.sizes.md};
  padding: ${theme.sizes.md} ${theme.sizes.lg};
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
export const StyledText = styled.Text`
  color: ${theme.colors.black};
  font-family: ${theme.fonts.poppinsMedium};
  font-size: ${theme.sizes.md};
`;
export const StyledDateString = styled.Text`
  color: ${theme.colors.midnight60};
  font-family: ${theme.fonts.poppinsNormal};
  font-size: ${theme.sizes.md};
`;
