import { Loader, useToast } from "@/components/ui";
import { DeniedModal } from "@/components/ui/DeniedModal";
import { theme } from "@/constants/theme";
import { postInviteValidate } from "@/services/api";
import { useUserStore } from "@/stores";
import { useCameraStore } from "@/stores/CameraStore";
import {
  BarcodeScanningResult,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";

export function Scan() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [isValidQRCode, setIsValidQRCode] = useState<boolean | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const toast = useToast();
  const { token, personId } = useUserStore();
  const { isOpen, setIsOpen } = useCameraStore();

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const handleBarcodeScanned = async (data: BarcodeScanningResult) => {
    setScanned(true);
    setIsLoading(true);

    try {
      const qrData = JSON.parse(data.data);

      const { addressId, visitorId, code } = qrData;

      if (!addressId || !visitorId || !code || !token || !personId) {
        throw new Error("QR Code inválido");
      }

      const dateNow = new Date();

      const result = await postInviteValidate(
        token,
        addressId,
        visitorId,
        personId,
        code,
        dateNow
      );

      setIsValidQRCode(result === true);
      setIsModalOpen(true);

      if (result !== true) {
        toast.show("Erro ao ler o QR Code!", 3000, "error");
      }
    } catch (error) {
      console.error("Erro ao validar QR Code:", error);
      toast.show("QR Code inválido ou erro na validação", 3000, "error");
      setIsValidQRCode(false);
      setIsLoading(false);
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  const handleNavigateIfScanSuccessful = () => {
    toast.show("Entrada Aprovada!", 3000, "success");
    setScanned(false);
    setIsOpen(false);
    setIsValidQRCode(null);
    setIsModalOpen(false);
    router.push("/(admin)");
  };

  useEffect(() => {
    if (isValidQRCode === true && isModalOpen) {
      handleNavigateIfScanSuccessful();
    }
  }, [isValidQRCode, isModalOpen]);

  const resetScanner = () => {
    setScanned(false);
    setIsOpen(true);
    setIsValidQRCode(null);
    setIsModalOpen(false);
  };

  if (!permission) {
    return <Container />;
  }

  if (!permission.granted) {
    return (
      <Container>
        <Message>Precisamos de acesso a Câmera</Message>
        <PermissionButton onPress={requestPermission}>
          <PermissionButtonText>Permitir Acesso</PermissionButtonText>
        </PermissionButton>
      </Container>
    );
  }

  return (
    <Container>
      {isOpen && (
        <StyledCameraView
          facing={facing}
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
        >
          {isLoading && <Loader />}
          <FocusBox />
          <ButtonContainer>
            <FlipButton onPress={toggleCameraFacing}>
              <FlipButtonText>Virar a Câmera</FlipButtonText>
            </FlipButton>
          </ButtonContainer>
        </StyledCameraView>
      )}

      {!isValidQRCode && (
        <DeniedModal
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          resetScanner={resetScanner}
          message="Negado"
        />
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
  width: 50%;
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
