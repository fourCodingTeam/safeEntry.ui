import { theme } from "@/constants/theme";
import styled from "styled-components/native";

interface DateButtonProps {
  selected?: boolean;
}

export const FiltersWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${theme.sizes.sm};
  padding-horizontal: ${theme.sizes.md};
`;

export const InviteCardsWrapper = styled.ScrollView`
  width: 100%;
  margin-bottom: 96px;
  padding-horizontal: ${theme.sizes.md};
`;

export const ImageWrapper = styled.View`
  width: 100%;
  height: 400px;
  border-radius: ${theme.sizes.md};
  overflow: hidden;
  padding-horizontal: ${theme.sizes.md};
`;

export const StyledImage = styled.Image`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const DateFilterButton = styled.TouchableOpacity<DateButtonProps>`
  padding: ${theme.sizes.smMax};
  border-radius: ${theme.sizes.smMax};
  border: ${({ selected }: DateButtonProps) =>
    selected
      ? `1px solid ${theme.colors.blue}`
      : `1px solid ${theme.colors.placeholder}`};
  background-color: ${({ selected }: DateButtonProps) =>
    selected ? theme.colors.blue : theme.colors.white};
  margin-left: ${theme.sizes.xs};
`;

export const DateFilterButtonText = styled.Text<DateButtonProps>`
  color: ${({ selected }: DateButtonProps) =>
    selected ? theme.colors.white : theme.colors.placeholder};
`;
