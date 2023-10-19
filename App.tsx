import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Page, { RootStackParamList } from './src/pages/pages';
import Home from './src/pages/Home';
import Logo from './src/components/shared/Logo';
import HistoryButton from './src/components/Topbar/HistoryButton';
import Transaction from './src/pages/Transaction';

const Stack = createNativeStackNavigator<RootStackParamList>();

import './global';

const Stream = require('stream-browserify');

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Page.HOME}
        screenOptions={{
          headerTitle: () => <Logo />,
          headerStyle: {
            backgroundColor: '#F7931A',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: '500',
          },
        }}>
        <Stack.Screen
          name={Page.HOME}
          component={Home}
          options={{
            headerRight: () => <HistoryButton />,
          }}
        />
        <Stack.Screen
          name={Page.TRANSACTION}
          component={Transaction}
          options={{
            headerBackVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
