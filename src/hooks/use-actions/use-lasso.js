import { useAction, useConstraints, useEffect, useLayout, useState, useTranslator } from '@nebula.js/stardust';
import lassoIcon from './lasso-icon';
import { getNextSelectLevel } from '../../picasso-def/getLevel';

export default function useLasso(options) {
  const { lassoIsAlwaysActive = false } = options || {};
  const constraints = useConstraints();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const layout = useLayout();
  const translator = useTranslator();

  const isInSelections = !!layout.qSelectionInfo.qInSelections;
  const selectLevel = getNextSelectLevel(layout);
  const isSingleSelection = selectLevel !== -1 && !!layout.qHyperCube.qDimensionInfo[selectLevel].qIsOneAndOnlyOne;

  useEffect(() => {
    if (!constraints) {
      return;
    }

    setEnabled(!constraints.select && !constraints.active);
  }, [constraints]);

  const action = (on) => {
    const newState = typeof on === 'boolean' ? on : !active;
    setActive(newState);
  };

  useAction(
    () => ({
      key: 'lasso',
      label: translator.get(active ? 'Tooltip.ToggleOffLassoSelection' : 'Tooltip.ToggleOnLassoSelection'),
      icon: lassoIcon,
      hidden: lassoIsAlwaysActive || !enabled || !isInSelections || isSingleSelection,
      active,
      action,
    }),
    [isInSelections, active, enabled, translator.language()]
  );

  return {
    action,
    enabled: () => enabled,
    active: () => lassoIsAlwaysActive || active,
  };
}
