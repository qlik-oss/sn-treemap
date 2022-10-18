import { useConstraints, useState, useEffect } from '@nebula.js/stardust';
import useLasso from './use-lasso';
import useSelect from './use-select';

export default function useActions(options) {
  const constraints = useConstraints();
  const [tooltip, setTooltip] = useState(false);
  const select = useSelect();
  const lasso = useLasso(options);

  useEffect(() => {
    if (!constraints) {
      return;
    }

    setTooltip(!constraints.passive);
  }, [constraints]);

  // A lot of dependent modules requires an action object. So here we return one in a matching format.
  // reuse and update a simgle object as is stored inside the chart settings and needs to be updated with out calling chart update
  const [actions] = useState({});
  actions.tooltip = {
    enabled: () => tooltip,
  };
  actions.lasso = lasso;
  actions.select = select;
  return actions;
}
