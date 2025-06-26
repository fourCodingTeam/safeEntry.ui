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
import { Dimensions } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Svg, { Defs, Mask, Rect } from "react-native-svg";
import styled from "styled-components/native";
import { StyledText, StyledTopText } from "../../styles";

const { width, height } = Dimensions.get("window");

export function Scan() {
  const boxSize = 250;
  const borderRadius = 20;
  const boxX = (width - boxSize) / 2;
  const boxY = (height - boxSize) / 2;

  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.04, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

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
        <StyledText style={{ textAlign: "center" }}>
          Precisamos de acesso a Câmera
        </StyledText>
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
          <Svg
            height={height}
            width={width}
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            <Defs>
              <Mask id="mask" x="0" y="0" height="100%" width="100%">
                <Rect x="0" y="0" width="100%" height="100%" fill="white" />
                <Rect
                  x={boxX}
                  y={boxY}
                  width={boxSize}
                  height={boxSize}
                  rx={borderRadius}
                  ry={borderRadius}
                  fill="black"
                />
              </Mask>
            </Defs>

            <Rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="rgba(0,0,0,0.7)"
              mask="url(#mask)"
            />
          </Svg>
          <TextWrapper
            style={{
              top: boxY + 270,
              width: width,
            }}
          >
            <StyledTopText
              style={{
                color: theme.colors.white,
              }}
            >
              APONTE PARA O QRCODE
            </StyledTopText>
          </TextWrapper>
          <Animated.View
            style={[
              {
                position: "absolute",
                borderWidth: 3,
                borderColor: "white",
                borderStyle: "dashed",
                top: boxY - 5,
                left: boxX - 5,
                width: boxSize + 10,
                height: boxSize + 10,
                borderRadius: borderRadius + 5,
              },
              animatedStyle,
            ]}
          />
        </StyledCameraView>
      )}

      {!isValidQRCode && (
        <DeniedModal
          visible={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            resetScanner();
          }}
          resetScanner={resetScanner}
          message="Convite inválido ou expirado!"
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
  text-align: center;
`;

const StyledCameraView = styled(CameraView)`
  background-color: ${theme.colors.black};
  height: 100%;
  width: 100%;
`;

const FocusBox = styled.View`
  position: absolute;
  border-width: 3px;
  border-color: white;
  border-style: dashed;
`;

const TextWrapper = styled.View`
  text-align: center;
  align-items: center;
`;

const PermissionButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 90%;
  background-color: ${theme.colors.blue};
  padding: ${theme.sizes.md};
  border-radius: ${theme.sizes.sm};
`;

const PermissionButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const AnimatedFocusBox = Animated.createAnimatedComponent(FocusBox);
