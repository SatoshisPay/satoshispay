import React from 'react';
import { Appearance } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Page, { RootStackParamList } from './src/pages/pages';
import Home from './src/pages/Home';
import Logo from './src/components/Topbar/Logo';
import Invoice from './src/pages/Invoice';
import WaitForPayment from './src/pages/WaitForPayment';
import { StatusBar, View } from 'react-native';
import Button from './src/components/Topbar/Button';
import History from './src/pages/History';
import Wallet from './src/pages/Wallet';

const Stack = createNativeStackNavigator<RootStackParamList>();

import './global';
import Settings from './src/pages/Settings';
import Startup from './src/pages/Startup';
import Onboarding from './src/pages/Onboarding';

require('stream-browserify');

function App(): JSX.Element {
  React.useEffect(() => {
    StatusBar.setBackgroundColor('#F7931A');
    StatusBar.setBarStyle('light-content');
    Appearance.setColorScheme('light');
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Page.STARTUP}
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
              <Button.Settings {...props} />
            </View>
          ),
        })}>
        <Stack.Screen
          name={Page.STARTUP}
          component={Startup}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={Page.ONBOARDING}
          component={Onboarding}
          options={{ headerShown: false }}
        />

        <Stack.Screen name={Page.HOME} component={Home} />
        <Stack.Screen name={Page.HISTORY} component={History} />
        <Stack.Screen name={Page.SETTINGS} component={Settings} />
        <Stack.Screen name={Page.WALLET} component={Wallet} />
        <Stack.Screen
          name={Page.INVOICE}
          component={Invoice}
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
