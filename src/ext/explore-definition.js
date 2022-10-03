import { getValue } from 'qlik-chart-modules';

function getNumDims(handler) {
  return handler.qHyperCube.qDimensionInfo.length || 0;
}

function getNumMeasures(handler) {
  return handler.qHyperCube.qMeasureInfo.length || 0;
}

function getLabelAuto(itemData) {
  return getValue(itemData, 'labels.auto');
}

function showHeaders(itemData, handler) {
  return !getLabelAuto(itemData) && getNumMeasures(handler) + getNumDims(handler) > 2;
}

function showOverlay(itemData, handler) {
  return !getLabelAuto(itemData) && getNumDims(handler) - (getValue(itemData, 'labels.headers') ? 1 : 0) > 1;
}

export default {
  type: 'items',
  component: 'accordion',
  items: {
    data: {
      uses: 'data',
    },
    presentation: {
      uses: 'presentation',
      type: 'items',
      translation: 'properties.presentation',
      grouped: false,
      items: {
        labels: {
          type: 'items',
          items: {
            auto: {
              ref: 'labels.auto',
              type: 'boolean',
              translation: 'properties.dataPoints.headersAndLabels',
              component: 'switch',
              options: [
                {
                  value: true,
                  translation: 'Common.Auto',
                },
                {
                  value: false,
                  translation: 'Common.Custom',
                },
              ],
            },
            headers: {
              ref: 'labels.headers',
              translation: 'properties.dataPoints.headers',
              type: 'boolean',
              component: 'switch',
              options: [
                {
                  value: true,
                  translation: 'Common.Auto',
                },
                {
                  value: false,
                  translation: 'properties.off',
                },
              ],
              show(itemData, handler) {
                return showHeaders(itemData, handler);
              },
            },
            overlay: {
              ref: 'labels.overlay',
              type: 'boolean',
              component: 'switch',
              translation: 'properties.dataPoints.overlayLabels',
              options: [
                {
                  value: true,
                  translation: 'Common.Auto',
                },
                {
                  value: false,
                  translation: 'properties.off',
                },
              ],
              show(itemData, handler) {
                return showOverlay(itemData, handler);
              },
            },
            leaves: {
              ref: 'labels.leaves',
              type: 'string',
              translation: 'properties.dataPoints.leafLabels',
              component: 'switch',
              options: [
                {
                  value: true,
                  translation: 'Common.Auto',
                },
                {
                  value: false,
                  translation: 'properties.off',
                },
              ],
              show(itemData) {
                return !getLabelAuto(itemData);
              },
            },
            values: {
              ref: 'labels.values',
              type: 'boolean',
              component: 'switch',
              translation: 'properties.dataPoints.labelmode',
              options: [
                {
                  value: true,
                  translation: 'Common.Auto',
                },
                {
                  value: false,
                  translation: 'properties.off',
                },
              ],
              show(itemData) {
                return getLabelAuto(itemData) || getValue(itemData, 'labels.leaves');
              },
            },
          },
        },
      },
    },
  },
};
