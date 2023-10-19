import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

interface Props {
  onCancel: () => void;
  onDismiss: () => void;
  visible: boolean;
}

const CancelModal = (props: Props) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={props.visible}
    onRequestClose={props.onDismiss}>
    <View className="flex flex-col items-center justify-center bg-white p-4">
      <View className="flex flex-col items-center justify-center">
        <Text className="text-brandAlt text-2xl text-center">
          Sei sicuro di voler cancellare questa transazione?
        </Text>
        <View className="flex flex-row justify-around items-center w-full py-4">
          <TouchableOpacity
            onPress={props.onDismiss}
            className="bg-brandAlt p-2 rounded-lg">
            <Text className="text-white text-2xl">Annulla</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={props.onCancel}
            className="bg-red-500 p-2 rounded-lg">
            <Text className="text-white text-2xl">Conferma</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

export default CancelModal;
