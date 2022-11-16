import { tooltip } from './tooltip';
import { tooltipInteraction } from './tooltipInteraction';

export default function createTooltipService({ level, layout, formatter }) {
  const getComponents = () => [tooltip({ level, layout, formatter })];
  const getInteractions = () => ({
    gestures: [],
    native: tooltipInteraction(),
  });

  return {
    getComponents,
    getInteractions,
  };
}
