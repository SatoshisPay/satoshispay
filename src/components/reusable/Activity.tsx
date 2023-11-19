import React from 'react';
import { View } from 'react-native';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Page = ({ children, className }: Props): JSX.Element => (
  <View
    className={`${className} flex flex-col items-center justify-center w-full`}>
    {children}
  </View>
);

const ListPage = ({ children, className }: Props): JSX.Element => (
  <View className={`${className} flex flex-col justify-center w-full`}>
    {children}
  </View>
);

const BrandPage = ({ children, className }: Props): JSX.Element => (
  <View
    className={`${className} flex flex-col items-center justify-center w-full bg-brand h-full`}>
    {children}
  </View>
);

export default {
  BrandPage,
  ListPage,
  Page,
};
