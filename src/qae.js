import customTooltipUtils from './custom-tooltip/utils';
import objectDefinition from './object-definition';

export const qae = ({ translator }) => ({
  data: {
    targets: [
      {
        path: '/qHyperCubeDef',
        dimensions: {
          min: 1,
          max: 15,
          description(properties, index) {
            const dimensionCount = properties.qHyperCubeDef.qDimensions.length;
            const translationProperty =
              index >= dimensionCount - 1
                ? 'Visualizations.Descriptions.Rectangle'
                : 'Visualizations.Descriptions.Group';

            return translator.get(translationProperty);
          },
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
          description(properties, index) {
            const translationProperty =
              index === 0 ? 'Visualizations.Descriptions.Size' : 'Visualizations.Descriptions.Color';
            return translator.get(translationProperty);
          },
        },
      },
    ],
  },
  properties: objectDefinition(),
});
