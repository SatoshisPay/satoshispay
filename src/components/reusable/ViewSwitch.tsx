import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

interface Props<T> {
  onChange: (tab: T) => void;
  selected: T;
  tabs: {
    title: string;
    value: T;
  }[];
}

function ViewSwitch<T>({ onChange, tabs, selected }: Props<T>) {
  return (
    <View className="w-full pt-4">
      <View className="flex flex-row items-center justify-center rounded-3xl w-fit mx-auto bg-white border border-gray-300">
        {tabs.map((tab, i) => (
          <View
            key={i}
            className={`flex flex-row items-center justify-center rounded-3xl py-2 ${
              selected === tab.value ? 'bg-gray-200' : ''
            }`}>
            <TouchableOpacity
              className="flex flex-row items-center justify-center px-4 rounded-xl"
              onPress={() => onChange(tab.value)}>
              <Text className="text-brandAlt font-bold text-xl">
                {tab.title}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

export default ViewSwitch;
