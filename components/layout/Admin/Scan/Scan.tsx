import { theme } from "@/constants/theme";
import invites from "@/mock/invites.json";
import {
  BarcodeScanningResult,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import React, { useState } from "react";
import styled from "styled-components/native";

export function Scan() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(true);
  const [isValidQRCode, setIsValidQRCode] = useState<boolean | null>(null);

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const handleBarcodeScanned = (data: BarcodeScanningResult) => {
    setScanned(true);
    setCameraOpen(false);

    const isValid = invites.some(
      (invite: { qrCodeUrl: string }) =>
        invite.qrCodeUrl === data.data.toString()
    );
    setIsValidQRCode(isValid);
  };

  const resetScanner = () => {
    setScanned(false);
    setCameraOpen(true);
    setIsValidQRCode(null);
  };

  if (!permission) {
    return <Container />;
  }

  if (!permission.granted) {
    return (
      <Container>
        <Message>We need your permission to show the camera</Message>
        <PermissionButton onPress={requestPermission}>
          <PermissionButtonText>Grant Permission</PermissionButtonText>
        </PermissionButton>
      </Container>
    );
  }

  return (
    <Container>
      {cameraOpen && (
        <StyledCameraView
          facing={facing}
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
        >
          <FocusBox />
          <ButtonContainer>
            <FlipButton onPress={toggleCameraFacing}>
              <FlipButtonText>Flip Camera</FlipButtonText>
            </FlipButton>
          </ButtonContainer>
        </StyledCameraView>
      )}

      {scanned && (
        <ValidationContainer>
          <ValidationMessage isValid={isValidQRCode}>
            {isValidQRCode
              ? "QR CODE VÁLIDO, VISITA VÁLIDA"
              : "QR CODE INVÁLIDO, VISITA NÃO ENCONTRADA"}
          </ValidationMessage>
          <ResetButton onPress={resetScanner}>
            <ResetButtonText>Scan Again</ResetButtonText>
          </ResetButton>
        </ValidationContainer>
      )}
    </Container>
  );
}

const Container = styled.View`
  background-color: ${theme.colors.white};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledCameraView = styled(CameraView)`
  background-color: ${theme.colors.black};
  flex: 1;
  width: 100%;
`;

const FocusBox = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  margin-left: -100px;
  margin-top: -100px;
  border-width: 2px;
  border-radius: 10px;
  border-color: white;
  border-style: dashed;
  background-color: transparent;
`;

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 100px;
  align-self: center;
`;

const FlipButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 328px;
  background-color: ${theme.colors.blue};
  padding: ${theme.sizes.md};
  border-radius: ${theme.sizes.sm};
`;

const FlipButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const Message = styled.Text`
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
`;

const PermissionButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: ${theme.colors.blue};
  padding: ${theme.sizes.md};
  border-radius: ${theme.sizes.sm};
`;

const PermissionButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const ValidationContainer = styled.View`
  width: 100%;
  padding: ${theme.sizes.md};
  background-color: ${theme.colors.white};
  justify-content: center;
  align-items: center;
`;

const ValidationMessage = styled.Text<{ isValid: boolean | null }>`
  font-size: 20px;
  font-weight: bold;
  color: ${(props: { isValid: boolean | null }) =>
    props.isValid ? "green" : "red"};
  margin-bottom: 20px;
`;

const ResetButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: ${theme.colors.blue};
  padding: ${theme.sizes.md};
  border-radius: ${theme.sizes.sm};
`;

const ResetButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;
