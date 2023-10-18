import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Page from './src/pages/pages';
import Home from './src/pages/Home';
import Logo from './src/components/shared/Logo';
import HistoryButton from './src/components/Topbar/HistoryButton';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Page.Home}
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
          name={Page.Home}
          component={Home}
          options={{
            headerRight: () => <HistoryButton />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
