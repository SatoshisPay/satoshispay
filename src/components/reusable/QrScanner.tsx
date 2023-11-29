import React from 'react';
import {
  Camera,
  Code,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler, Modal, Text, TouchableOpacity, View } from 'react-native';
import { X } from 'react-native-feather';

interface Props {
  visible: boolean;
  onQrCodeScanned: (code: string) => void;
  onClose: () => void;
}

const QrScanner = ({ visible, onQrCodeScanned, onClose }: Props) => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const [activeCamera, setActiveCamera] = React.useState<boolean>(false);

  const onScan = (codes: Code[]) => {
    for (const code of codes) {
      if (code.type === 'qr' && code.value) {
        onQrCodeScanned(code.value);
      }
    }
  };

  const cameraDevice = useCameraDevice('back');

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: onScan,
  });

  // handle back button
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (visible) {
          onClose();
          return true;
        }

        return false;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );
      return () => subscription.remove();
    }, [visible]),
  );

  React.useEffect(() => {
    if (visible) {
      if (!hasPermission) {
        requestPermission().then(permission => {
          if (permission && cameraDevice) {
            setActiveCamera(true);
          }
        });
      } else {
        setActiveCamera(true);
      }
    } else {
      setActiveCamera(false);
    }
  }, [visible]);

  return (
    <Modal visible={visible} animationType="slide">
      <View className="w-full h-full flex flex-col">
        <View className="flex flex-row items-center justify-between px-4 w-full bg-brand z-10">
          <Text className="text-brandAlt text-xl">Scannerizza QR Code</Text>
          <TouchableOpacity onPress={onClose}>
            <X
              width={32}
              height={32}
              className="text-brandAlt w-[16px] h-[16px] ml-4"
            />
          </TouchableOpacity>
        </View>
        <View className="w-full h-max flex-1">
          {cameraDevice ? (
            <Camera
              className="h-full"
              codeScanner={codeScanner}
              device={cameraDevice}
              isActive={activeCamera}
            />
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

export default QrScanner;
