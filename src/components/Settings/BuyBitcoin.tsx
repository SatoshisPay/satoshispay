import * as React from 'react';
import { View, StatusBar, Text, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { BuyBitcoinProvider } from '@breeztech/react-native-breez-sdk';
import { useBackHandler } from '@react-native-community/hooks';

import Providers from './BuyBitcoin/Providers';
import Spinner from '../reusable/Spinner';
import { breezGetBuyBitcoinUrl } from '../../api/breez';

const screenDimensions = Dimensions.get('screen');

const BuyBitcoin = () => {
  const [statusBarHeight, setStatusBarHeight] = React.useState(0);
  const [provider, setProvider] = React.useState<BuyBitcoinProvider>();
  const [url, setUrl] = React.useState<string>();

  // handle back button
  useBackHandler(() => {
    if (url || provider) {
      setProvider(undefined);
      setUrl(undefined);
      return true;
    }
    return false;
  });

  React.useEffect(() => {
    if (StatusBar.currentHeight) {
      setStatusBarHeight(StatusBar.currentHeight);
    }
  }, [StatusBar.currentHeight]);

  React.useEffect(() => {
    if (provider && !url) {
      breezGetBuyBitcoinUrl(provider)
        .then(setUrl)
        .catch(e => {
          console.log(e);
          setProvider(undefined);
        });
    }
  }, [provider]);

  if (!provider) {
    return <Providers onProviderChange={setProvider} />;
  }

  if (!url) {
    return (
      <Spinner bgColor="bg-transparent">
        <Text>Caricamento...</Text>
      </Spinner>
    );
  }

  return (
    <View
      className="w-full"
      style={{
        marginTop: statusBarHeight,
        height: screenDimensions.height - statusBarHeight - 32,
      }}>
      <WebView
        className="w-full h-full"
        source={{
          uri: url,
        }}
      />
    </View>
  );
};

export default BuyBitcoin;
