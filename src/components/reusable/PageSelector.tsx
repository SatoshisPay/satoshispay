import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface Props {
  page: number;
  onChange: (page: number) => void;
  min: number;
  max: number;
}

interface PageBtnProps {
  children: React.ReactNode;
  onClick: () => void;
  selected?: boolean;
}

const PageBtn = (props: PageBtnProps) => (
  <TouchableOpacity
    onPress={props.onClick}
    className={`flex items-center justify-center mx-[1px] px-4 rounded-full w-auto h-10 leading-tight text-gray-700 ${
      props.selected ? 'bg-brand' : 'bg-white'
    } border border-gray-300  `}>
    {props.children}
  </TouchableOpacity>
);

const PageSelector = ({ page, onChange, min, max }: Props) => {
  const pages = Array.from({ length: max - min + 1 }, (_, i) => i + min).map(
    i => (
      <PageBtn key={i} onClick={() => onChange(i)} selected={page === i}>
        <Text className="text-brandAlt">{i}</Text>
      </PageBtn>
    ),
  );

  return (
    <View className="flex flex-row items-center justify-center my-2">
      {pages}
    </View>
  );
};

export default PageSelector;
