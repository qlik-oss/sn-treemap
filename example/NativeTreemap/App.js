/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Canvas from './src/components/Canvas';
import Connection from './src/components/Connection';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getHeaderTitle} from '@react-navigation/elements';
import ConnectionsList from './src/components/ConnectionsList';
import AppList from './src/components/AppList';
import VizList from './src/components/VizList';
import {Appbar} from 'react-native-paper';
import {useAtomValue} from 'jotai';
import {loadableOpenAppAtom} from './src/atoms';
const Stack = createNativeStackNavigator();

const App = () => {
  const openedApp = useAtomValue(loadableOpenAppAtom);

  const handleClear = useCallback(() => {
    if (openedApp.data.app) {
      openedApp.data.app.clearAll();
    }
  }, [openedApp]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: ({navigation, route, options, back}) => {
            const title = getHeaderTitle(options, route.name);
            return (
              <Appbar.Header>
                {navigation.canGoBack() ? (
                  <Appbar.BackAction onPress={navigation.goBack} />
                ) : null}
                <Appbar.Content title={title} />
              </Appbar.Header>
            );
          },
        }}>
        <Stack.Screen
          name="ConnectionsList"
          component={ConnectionsList}
          options={{header: () => null}}
        />
        <Stack.Screen name="AppList" component={AppList} />
        <Stack.Screen name="Connection" component={Connection} />
        <Stack.Screen
          name="VizList"
          component={VizList}
          options={{
            header: ({navigation, route, options, back}) => {
              const title = getHeaderTitle(options, route.name);
              return (
                <Appbar.Header>
                  {navigation.canGoBack() ? (
                    <Appbar.BackAction onPress={navigation.goBack} />
                  ) : null}
                  <Appbar.Content title={title} />
                  <Appbar.Action icon="selection-off" onPress={handleClear} />
                </Appbar.Header>
              );
            },
          }}
        />
        <Stack.Screen name="Canvas" component={Canvas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
