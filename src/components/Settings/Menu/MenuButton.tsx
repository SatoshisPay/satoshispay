import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

interface Props {
  onClick: () => void;
  text: string;
  icon: React.ReactNode;
}

const MenuButton = ({ onClick, text, icon }: Props) => (
  <View className="flex flex-col w-full">
    <TouchableOpacity onPress={onClick} className="py-4 px-4 w-full">
      <View className="flex flex-row items-center">
        {icon}
        <Text className="ml-4 text-center text-xl">{text}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

export default MenuButton;
