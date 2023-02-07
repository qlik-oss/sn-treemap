import { tooltip } from './tooltip';
import { tooltipInteraction } from './tooltipInteraction';

export default function createTooltipService({ level, layout }) {
  const getComponents = () => [tooltip({ level, layout })];
  const getInteractions = () => ({
    gestures: [],
    native: tooltipInteraction(),
  });

  return {
    getComponents,
    getInteractions,
  };
}
