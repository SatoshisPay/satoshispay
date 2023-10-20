import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Page, { RootStackParamList } from './src/pages/pages';
import Home from './src/pages/Home';
import Logo from './src/components/shared/Logo';
import HistoryButton from './src/components/Topbar/Button';
import Transaction from './src/pages/Transaction';

const Stack = createNativeStackNavigator<RootStackParamList>();

import './global';
import WaitForPayment from './src/pages/WaitForPayment';
import { View } from 'react-native';
import Button from './src/components/Topbar/Button';
import History from './src/pages/History';
import Wallet from './src/pages/Wallet';

const Stream = require('stream-browserify');

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Page.HOME}
        screenOptions={props => ({
          headerTitle: () => <Logo />,
          headerStyle: {
            backgroundColor: '#F7931A',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: '500',
          },
          headerBackVisible: false,
          headerRight: () => (
            <View className="flex flex-row justify-between items-center">
              <Button.Home {...props} />
              <Button.History {...props} />
              <Button.Wallet {...props} />
            </View>
          ),
        })}>
        <Stack.Screen name={Page.HOME} component={Home} />
        <Stack.Screen name={Page.HISTORY} component={History} />
        <Stack.Screen name={Page.WALLET} component={Wallet} />
        <Stack.Screen
          name={Page.TRANSACTION}
          component={Transaction}
          options={{ headerBackVisible: false, headerRight: () => <></> }}
        />
        <Stack.Screen
          name={Page.WAIT_FOR_PAYMENT}
          component={WaitForPayment}
          options={{ headerBackVisible: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
