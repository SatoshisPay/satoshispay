import React from 'react';
import { View } from 'react-native';

interface Props {
  children: React.ReactNode;
}

const Page = ({ children }: Props): JSX.Element => (
  <View className="flex flex-col items-center justify-center w-full">
    {children}
  </View>
);

const ListPage = ({ children }: Props): JSX.Element => (
  <View className="flex flex-col justify-center w-full">{children}</View>
);

const BrandPage = ({ children }: Props): JSX.Element => (
  <View className="flex flex-col items-center justify-center w-full bg-brand h-full">
    {children}
  </View>
);

export default {
  BrandPage,
  ListPage,
  Page,
};
