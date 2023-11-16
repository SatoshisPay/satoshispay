import * as React from 'react';
import { X, Info as InfoIcon, AlertTriangle } from 'react-native-feather';

import { View } from 'react-native';

const Danger = (props: React.HTMLProps<HTMLDivElement>) => (
  <View
    className={`${props.className} p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 shadow-lg`}>
    <View className="flex flex-row items-center w-full">
      <View>
        <X width={32} height={32} className="text-red-800" />
      </View>
      <View className="w-11/12">{props.children}</View>
    </View>
  </View>
);

const Info = (props: React.HTMLProps<HTMLDivElement>) => (
  <View
    className={`${props.className} p-4 mb-4 text-sm text-blue-800 bg-blue-50 rounded-lg shadow-lg`}>
    <View className="flex flex-row items-center gap-8">
      <View>
        <InfoIcon width={32} height={32} />
      </View>
      <View>{props.children}</View>
    </View>
  </View>
);

const Warning = (props: React.HTMLProps<HTMLDivElement>) => (
  <View
    className={`${props.className} p-4 mb-4 text-sm text-yellow-800 bg-yellow-50 rounded-lg shadow-lg`}>
    <View className="flex flex-row items-center">
      <AlertTriangle className="text-yellow-800 mx-4" width={32} height={32} />
      <View>{props.children}</View>
    </View>
  </View>
);

export default {
  Danger,
  Info,
  Warning,
};
