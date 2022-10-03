import React from 'react';
import {StyleSheet} from 'react-native';
import {Supernova} from '@qlik/react-native-carbon';
// import your SN here
import supernova from '@nebula.js/react-native-sn-treemap';
import theme from './theme.json';
import {useAtomValue} from 'jotai';
import {currentModelAtom, loadableOpenAppAtom} from '../atoms';
import {SafeAreaView} from 'react-native-safe-area-context';

const Visualization = () => {
  const model = useAtomValue(currentModelAtom);
  const openedApp = useAtomValue<any>(loadableOpenAppAtom);

  return (
    <SafeAreaView style={styles.body} edges={['bottom', 'left', 'right']}>
      <Supernova
        sn={supernova}
        theme={theme}
        object={model}
        app={openedApp.data.app}
        appLayout={openedApp.data.appLayout}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    overflow: 'hidden',
    padding: 8,
    margin: 8,
  },
});

export default Visualization;
