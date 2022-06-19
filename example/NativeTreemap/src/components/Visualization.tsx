import React from 'react';
import {StyleSheet} from 'react-native';
import {Supernova} from '@qlik/react-native-carbon';
// import your SN here
import supernova from '@qlik/sn-treemap';
import {Surface} from 'react-native-paper';
import theme from './theme.json';
import {useAtomValue} from 'jotai';
import {loadableOpenAppAtom} from '../atoms';

export type VisualizationProps = {
  model: any;
};

const Visualization: React.FC<VisualizationProps> = ({model}) => {
  const openedApp = useAtomValue<any>(loadableOpenAppAtom);
  return (
    <Surface style={styles.body}>
      <Supernova
        sn={supernova}
        theme={theme}
        object={model}
        app={openedApp.data.app}
        appLayout={openedApp.data.appLayout}
      />
    </Surface>
  );
};

const styles = StyleSheet.create({
  body: {
    width: '100%',
    height: 400,
    marginVertical: 16,
    borderRadius: 4,
    backgroundColor: 'white',
    elevation: 1,
    overflow: 'hidden',
    padding: 4,
  },
});

export default Visualization;
