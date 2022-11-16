import customTooltipUtils from './custom-tooltip/utils';
import objectDefinition from './object-definition';

export const qae = {
  data: {
    targets: [
      {
        path: '/qHyperCubeDef',
        dimensions: {
          min: 1,
          add(dimension, props) {
            customTooltipUtils.addCallbackCustomTooltip(props);
          },
          move(dimension, props) {
            customTooltipUtils.moveCallbackCustomTooltip(props, dimension);
          },
          remove(dimension, props) {
            customTooltipUtils.removeCallbackCustomTooltip(props, dimension);
          },
          replace(dimension, oldDimension, index, props) {
            customTooltipUtils.replaceCallbackCustomTooltip(props, oldDimension);
          },
        },
        measures: {
          min: 1,
          max: 1,
        },
      },
    ],
  },
  properties: objectDefinition(),
};
