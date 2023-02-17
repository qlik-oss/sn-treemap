// import propertyResolver from '../../../assets/client/utils/property-resolver';
import { setValue, getValue } from 'qlik-chart-modules';

export default function propertyDefinition(env) {
  // keep flags here for future use
  // eslint-disable-next-line no-unused-vars
  const { flags } = env;

  function hasDepth(data, handler) {
    const dims = handler.getDimensions();
    const measures = handler.getMeasures();
    return measures.length + dims.length > 2;
  }

  const simpleColors = {
    items: {
      simpleItems: {
        items: {
          autoColor: {
            change: (data) => {
              if (!data.color?.auto) {
                if (data.qHyperCubeDef?.qDimensions?.length > 1) {
                  setValue(data, 'color.mode', 'byDimension');
                  setValue(data, 'color.byDimDef.activeDimensionIndex', 0);
                } else {
                  setValue(data, 'color.mode', 'primary');
                }
              }
            },
          },
        },
      },
    },
  };

  const simpleLabels = {
    items: {
      labels: {
        items: {
          header: {
            show(props) {
              return props.qHyperCubeDef.qDimensions.length && props.qHyperCubeDef.qMeasures.length;
            },
          },
          valueLabels: {
            component: 'checkbox',
            ref: 'labels.values',
            type: 'boolean',
            translation: 'Simple.Label.Value',
            show(props) {
              return props.qHyperCubeDef.qDimensions.length && props.qHyperCubeDef.qMeasures.length;
            },
            convertFunctions: {
              get(getter, def, args, data) {
                return data.labels?.leaves && data.labels?.values;
              },
              set(value, setter, def, args, data) {
                setValue(data, 'labels.leaves', true);
                setValue(data, 'labels.values', value);
              },
            },
          },
          headers: {
            component: 'checkbox',
            ref: 'labels.headers',
            type: 'boolean',
            defaultValue: true,
            translation: 'Simple.Label.Header',
            show(props) {
              return props.qHyperCubeDef.qDimensions.length > 1 && props.qHyperCubeDef.qMeasures.length;
            },
            convertFunctions: {
              get(getter, def, args, data) {
                return data.labels?.auto || data.labels?.headers;
              },
              set(value, setter, def, args, data) {
                if (!value) {
                  setValue(data, 'labels.auto', false);
                }
                setValue(data, 'labels.headers', value);
              },
            },
          },
        },
      },
    },
  };

  const settings = {
    uses: 'settings',
    items: {
      simpleLabels,
      general: {
        items: {
          showDisclaimer: {
            translation: 'properties.showDisclaimer',
            type: 'boolean',
            ref: 'showDisclaimer',
            component: 'switch',
            defaultValue: true,
            options: [
              {
                value: true,
                translation: 'Common.Show',
              },
              {
                value: false,
                translation: 'properties.hide',
              },
            ],
          },
        },
      },
      presentation: {
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
                defaultValue: true,
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
                snapshot: {
                  tid: 'property-dataPoints',
                },
              },
              headers: {
                ref: 'labels.headers',
                translation: 'properties.dataPoints.headers',
                type: 'boolean',
                component: 'switch',
                defaultValue: true,
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
                  return !getValue(itemData, 'labels.auto') && hasDepth(itemData, handler);
                },
              },
              overlay: {
                ref: 'labels.overlay',
                type: 'boolean',
                component: 'switch',
                translation: 'properties.dataPoints.overlayLabels',
                defaultValue: true,
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
                show(data, handler) {
                  return (
                    !getValue(data, 'labels.auto') &&
                    handler.getDimensions().length - (getValue(data, 'labels.headers') ? 1 : 0) > 1
                  );
                },
              },
              leaves: {
                ref: 'labels.leaves',
                type: 'string',
                translation: 'properties.dataPoints.leafLabels',
                component: 'switch',
                defaultValue: true,
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
                  return !getValue(itemData, 'labels.auto');
                },
                snapshot: {
                  tid: 'property-leafLabels',
                },
              },
              values: {
                ref: 'labels.values',
                type: 'boolean',
                component: 'switch',
                translation: 'properties.dataPoints.labelmode',
                defaultValue: false,
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
                show(data) {
                  return getValue(data, 'labels.auto') || getValue(data, 'labels.leaves');
                },
              },
            },
          },
        },
      },
      colorsAndLegend: {
        uses: 'colorsAndLegend',
        items: {
          simpleColors,
          legend: {
            items: {
              show: {
                defaultValue: false,
              },
            },
          },
        },
      },
      tooltips: {
        uses: 'tooltip',
      },
    },
  };

  const data = {
    uses: 'data',
    items: {
      dimensions: {},
      measures: {},
    },
  };

  const addons = {
    type: 'items',
    component: 'expandable-items',
    translation: 'properties.addons',
    items: {
      dataHandling: {
        uses: 'dataHandling',
        items: {
          suppressZero: null,
          calcCond: {
            uses: 'calcCond',
          },
        },
      },
    },
  };

  return {
    type: 'items',
    component: 'accordion',
    items: {
      data,
      addons,
      settings,
    },
  };
}
