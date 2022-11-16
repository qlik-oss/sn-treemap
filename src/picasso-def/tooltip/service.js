import { tooltipService } from 'qlik-chart-modules';
import { getSections } from './section';

const TOOLTIP_COMPONENT_KEY = 'tooltip-qcm';

const collectFrom = ({ nodes }) => {
  const node = nodes.filter((n) => !!n.data)[0];
  return node ? [node] : [];
};

export default function createTooltipService({
  chart,
  actions,
  translator,
  rtl,
  colorService,
  theme,
  custom,
  properties,
  layout,
  formatter,
}) {
  const major = ({ data }) => data.value;
  // const filter = ({ data }) => !data.null.value || data.end.value === 0;

  return tooltipService({
    chart,
    translator,
    config: {
      rtl,
      enable: () => actions.tooltip.enabled(),
      getColorSettings: () => colorService.getSettings(),
      style: {
        fontFamily: theme.getStyle('object.treemap', 'label.name', 'fontFamily'),
      },
      main: {
        key: TOOLTIP_COMPONENT_KEY,
        getGroupByValue: major, // is this needed ?
        collectibles: [
          {
            key: 'treemap',
            type: 'treemap',
            major,
          },
        ],
        triggers: [
          {
            keys: ['treemap'],
            collect: {
              from: collectFrom,
            },
            placement: 'collectible',
          },
        ],
        section: getSections({ layout, custom, formatter }),
        layout: {
          grouping: true,
          single: () => !!(custom.isEnabled() && custom.hasImages()) || custom.chart.isEnabled(),
        },
        events: {
          tooltip: {
            beforeShow: ({ collectNodes }) => {
              if (!custom.isEnabled() || !custom.hasImages()) {
                return Promise.resolve();
              }

              return custom.addImages({ nodes: collectNodes() });
            },
            afterShow: ({ nodes }) => {
              if (custom.chart.isEnabled() && !custom.chart.hasLimitation()) {
                custom.chart.show({
                  nodes,
                  properties,
                });
              }
            },
          },
          interaction: {
            mouseleave: () => {
              if (custom.chart.isEnabled() && custom.chart.hasAlternateState()) {
                custom.chart.hide();
              }
            },
          },
        },
      },
      legend: {
        keys: {
          tooltip: 'legend-color-cat',
          component: 'legend-cat',
        },
      },
    },
  });
}
