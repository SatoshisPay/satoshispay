import * as React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { BuyBitcoinProvider } from '@breeztech/react-native-breez-sdk';
import { useBackHandler } from '@react-native-community/hooks';

import Providers from './BuyBitcoin/Providers';
import Spinner from '../reusable/Spinner';
import { breezGetBuyBitcoinUrl } from '../../api/breez';
import { error } from '../../utils/log';

const windowDimensions = Dimensions.get('window');

const PADDING = 64;

const BuyBitcoin = () => {
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
    if (provider && !url) {
      breezGetBuyBitcoinUrl(provider)
        .then(setUrl)
        .catch(e => {
          error(e);
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
      className="w-full bg-white"
      style={{
        height: windowDimensions.height - PADDING,
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
