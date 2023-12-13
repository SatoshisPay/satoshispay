import * as React from 'react';
import { View, StatusBar, Text, Dimensions } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { WebView } from 'react-native-webview';

import Spinner from '../reusable/Spinner';

enum LocationPermissions {
  GRANTED,
  DENIED,
  UNKNOWN,
}

const screenDimensions = Dimensions.get('screen');

const BtcMap = () => {
  const [statusBarHeight, setStatusBarHeight] = React.useState(0);
  const [locationPermissions, setLocationPermission] =
    React.useState<LocationPermissions>(LocationPermissions.UNKNOWN);

  React.useEffect(() => {
    if (locationPermissions === LocationPermissions.UNKNOWN) {
      Geolocation.requestAuthorization(
        () => {
          setLocationPermission(LocationPermissions.GRANTED);
        },
        () => {
          setLocationPermission(LocationPermissions.DENIED);
        },
      );
    }
  }, [locationPermissions]);

  React.useEffect(() => {
    if (StatusBar.currentHeight) {
      setStatusBarHeight(StatusBar.currentHeight);
    }
  }, [StatusBar.currentHeight]);

  if (locationPermissions === LocationPermissions.UNKNOWN) {
    return (
      <Spinner bgColor="bg-transparent">
        <Text className="text-brandAlt">Caricamento in corso...</Text>
      </Spinner>
    );
  }

  return (
    <View
      className="w-full"
      style={{
        marginTop: statusBarHeight,
        height: screenDimensions.height - statusBarHeight,
      }}>
      <WebView
        className="w-full h-full"
        source={{
          uri: 'https://btcmap.org/map',
        }}
        geolocationEnabled={locationPermissions === LocationPermissions.GRANTED}
      />
    </View>
  );
};

export default BtcMap;
