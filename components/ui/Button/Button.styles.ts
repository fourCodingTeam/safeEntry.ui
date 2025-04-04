import styled from "styled-components/native";
type ButtonContainerProps = {
  color: string;
};
export const ButtonContainer = styled.View<ButtonContainerProps>`
  background-color: ${({ color }: ButtonContainerProps) => color};
  width: 100%;
`;
