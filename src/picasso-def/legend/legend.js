import { catLegend } from './catLegend';
import { seqLegend } from './seqLegend';

export const legend = ({ layout, color }) => {
  if (layout.legend.show) {
    if (color.type === 'categorical-color') {
      return catLegend({ color, layout });
    }
    return seqLegend({ color, layout });
  }
  return undefined;
};
