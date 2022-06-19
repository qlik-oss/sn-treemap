import React, {useCallback} from 'react';
import {useAtomValue} from 'jotai';
import {loadableVizList} from '../atoms';
import Loader from './Loader';
import {FlatList} from 'react-native';
import Visualization from './Visualization';
import {SafeAreaView} from 'react-native-safe-area-context';
import { SelectionsToolbar } from '@qlik/react-native-carbon';
import { supernovaStateAtom, supernovaToolTipStateAtom } from '@qlik/react-native-carbon/src/carbonAtoms';
import { useResetAtom } from 'jotai/utils';
import { IconButton } from 'react-native-paper';

const VizList = () => {
  const vizList = useAtomValue<any>(loadableVizList);
  const supernovaState = useAtomValue(supernovaStateAtom);
  const resetSupernovaState = useResetAtom(supernovaStateAtom);
  const resetTooltipState = useResetAtom(supernovaToolTipStateAtom);

  const renderItem = useCallback(({item}: any) => {
    return <Visualization model={item} />;
  }, []);

  const onConfirm = () => {
    if (supernovaState) {
      supernovaState.confirmSelection();
    }
    resetSupernovaState();
    resetTooltipState();
  };

  const onCancel = () => {
    if (supernovaState) {
      supernovaState.cancelSelection();
    }
    resetSupernovaState();
    resetTooltipState();
  };

  const onClearSelections = () => {
    if (supernovaState) {
      supernovaState.clear();
    }
    resetTooltipState();
  };

  const handleToggledLasso = (val) => {
    if (supernovaState) {
      supernovaState.toggleLasso(val);
    }
  };


  return vizList.state === 'loading' ? (
    <Loader />
  ) : (
    <SafeAreaView
      edges={['left', 'right', 'bottom']}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{flex: 1, justifyContent: 'center', marginHorizontal: 8}}>
      <FlatList renderItem={renderItem} data={vizList.data} />
      <SelectionsToolbar
        visible={supernovaState.active}
        position={supernovaState.position}
        onConfirm={onConfirm}
        onCancel={onCancel}
        onClear={onClearSelections}
        onToggledLasso={handleToggledLasso}
        icons={{confirm: 'check', cancel: 'close', clear: 'selection-off'}}
      />
    </SafeAreaView>
  );
};

export default VizList;
