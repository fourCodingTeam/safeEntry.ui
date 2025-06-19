import { theme } from "@/constants/theme";
import styled from "styled-components/native";

export const CardWrapper = styled.View`
  flex-direction: column;
  justify-content: space-between;
  background-color: ${theme.colors.white};
  width: 100%;
  align-items: flex-start;
  gap: 8px;
  border-radius: ${theme.sizes.md};
  border: 1px solid ${theme.colors.black40};
  padding: ${theme.sizes.smMax} ${theme.sizes.md};
  margin-bottom: ${theme.sizes.sm};
  elevation: 2;
`;

export const ResidentName = styled.Text`
  color: ${theme.colors.black};
  font-family: ${theme.fonts.poppinsMedium};
  font-size: ${theme.sizes.md};
`;

export const ResidentPhoneNumber = styled.Text`
  color: ${theme.colors.placeholder};
  font-family: ${theme.fonts.poppinsNormal};
  font-size: ${theme.sizes.md};
`;

export const StatusTag = styled.View`
  flex-direction: column;
  border-radius: 8px;
`;
export const ResidentStatus = styled.Text`
  color: ${theme.colors.placeholder};
  font-family: ${theme.fonts.poppinsNormal};
  font-size: ${theme.sizes.md};
`;

export const IconWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;
export const ContactTagWhatsapp = styled.TouchableOpacity`
  min-width: 160px;
  flex-direction: row;
  gap: 8px;
  background-color: ${theme.colors.green};
  padding: 8px 8px;
  border-radius: 8px;
`;
export const ContactTag = styled.TouchableOpacity`
  min-width: 160px;
  flex-direction: row;
  gap: 8px;
  background-color: ${theme.colors.offWhite};
  padding: 8px 8px;
  border-radius: 8px;
`;

export const ContactTextWhite = styled.Text`
  color: ${theme.colors.white};
  font-family: ${theme.fonts.poppinsNormal};
  font-size: ${theme.sizes.md};
`;
export const ContactText = styled.Text`
  color: ${theme.colors.black60};
  font-family: ${theme.fonts.poppinsNormal};
  font-size: ${theme.sizes.md};
`;

export const InfoWrapper = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
`;
export const InfoWrapperEnd = styled.View`
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const Row = styled.View`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;
