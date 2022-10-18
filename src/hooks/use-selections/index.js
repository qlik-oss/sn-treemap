import { selectionService as createSelectionService } from 'qlik-chart-modules';
import { useSelections, useEffect, useState, useStaleLayout } from '@nebula.js/stardust';
import clear from './clear';
import start from './start';

export default function useSelectionService({ chart, actions }) {
  const selections = useSelections();
  const staleLayout = useStaleLayout();
  const [selectionService, setSelectionService] = useState();

  useEffect(() => {
    if (!chart?.update || !selections) {
      return null;
    }

    const service = createSelectionService({
      chart,
      actions,
      selections,
      config: {
        brushRanges: false,
        selectionActions: { clear },
        selectionEvents: { start },
      },
    });

    service.setLayout(staleLayout);

    const { destroy } = service;

    setSelectionService(service);

    return () => {
      destroy();
    };
  }, [selections, chart?.update]);

  useEffect(() => {
    if (!selectionService?.setLayout || !staleLayout) {
      return;
    }
    selectionService.setLayout(staleLayout);
  }, [staleLayout]);

  return selectionService;
}
