import { getLevel, getNextSelecteDim } from './getLevel';
import ChartFormatting from './formatting/chart-formatting';
import { legend } from './legend';
import createSelectables from './selectables';
import { tooltip, tooltipInteraction } from './tooltip';
import { active, inactive } from './brushStyles';
import { dockLayout } from './dock-layout';
import gesturesToInteractions from './gesturesToInteractions';

const getFormatterForMeasures = (localeInfo, nrMeasures, qMeasureInfo) => {
  let measure;
  const chartFormatter = new ChartFormatting(localeInfo, qMeasureInfo);
  let f;
  let formatters = [];

  for (let i = 0; i < nrMeasures; i++) {
    measure = qMeasureInfo[i];
    f = chartFormatter.getMeasureFormatter(i);
    if (f && f.type === 'U') {
      f.pattern = f.createPatternFromRange(measure.qMax, measure.qMax, true);
      if (Math.floor(Math.log(Math.abs(measure.qMax)) / Math.log(10)) % 3 === 2) {
        f.pattern = f.pattern.substr(0, f.pattern.length - 2);
        f.pattern += 'A';
      }
      f.prepare();
    }

    formatters.push(f);
  }

  // the api importing returns  undefined formatters, filter them out, then
  // add a default one if necessary.
  formatters = formatters.filter((formatter) => formatter !== undefined);

  if (formatters.length === 0) {
    // add default formatter
    formatters.push({
      formatValue: (v) => v,
    });
  }
  return formatters;
};

export const picassoDef = ({
  layout,
  theme,
  env,
  showLegend,
  invalidMessage,
  translator,
  colorService,
  chart,
  options,
  actions,
}) => {
  if (!layout.qHyperCube) {
    return {};
  }
  const level = getLevel(layout);
  const dimLevel = getNextSelecteDim(layout);
  const selectLevel = Math.min(level, dimLevel);
  const interactionType = env.carbon ? 'kinesics' : 'hammer';
  const { qMeasureInfo } = layout.qHyperCube;

  const formatter = getFormatterForMeasures('', qMeasureInfo.length, qMeasureInfo);

  const scales = colorService.getScales();

  const treemapLegend = legend({ colorService, chart, layout });
  const selectables = createSelectables({
    actions,
    colorService,
    isDimensionLocked: false,
    isSingleSelectionmodels: false,
    scales,
    legendComponent: treemapLegend?.components[0],
  });
  const gestures = selectables.gestures.sort((a, b) => (b.prio || 0) - (a.prio || 0));

  const collections = [
    {
      key: 'hierarchy',
      data: {
        hierarchy: {
          label(datum) {
            return datum?.qText ? datum.qText : undefined;
          },
          value(datum) {
            if (datum?.qType === 'N' && datum?.qSubNodes?.length > 1) {
              return 'NaN';
            }
            if (datum?.qType === 'N' && datum?.qSubNodes?.length === 1) {
              let sb = datum.qSubNodes;
              while (sb.length > 1) {
                sb = sb.qSubNodes;
              }
              if (sb[0].qType !== 'V') {
                return 0;
              }
              return datum.qMaxPos;
            }
            if (datum.qType === 'O' && datum?.qSubNodes?.length === 1) {
              return datum?.qSubNodes[0].qValue || 0;
            }

            return 0;
          },
          props: {
            select: {
              field: `qDimensionInfo/${selectLevel}`,
              reduce: (values) => (values.length === 1 ? values[0] : undefined),
            },
            ...colorService.getDatumProps(),
            isOther: { value: (d, node) => node.data.qElemNo === -3 },
          },
        },
      },
    },
  ];

  const brushSettings = {
    consume: [
      {
        filter: (d) => d?.data?.select?.value > -1,
        context: 'selection',
        data: ['select', 'fill'],
        style: {
          active: active(),
          inactive: inactive(),
        },
      },
    ],
  };

  const components = [
    {
      type: 'treemap',
      key: 'treemap',
      data: { collection: { key: 'hierarchy' } },
      settings: {
        formatter,
        labels: layout.labels,
        box: {
          fill: colorService.getColor(),
        },
        color: {
          mode: layout.color.mode,
          measureScheme: layout.color.measureScheme,
          others: theme.getDataColorSpecials().others,
          persistent: layout.color.persistent || layout.qHyperCube.qDimensionInfo.length > 1,
        },
        showHeaders: layout.qHyperCube.qDimensionInfo.length > 1,
        getContrastingColorTo: theme.getContrastingColorTo,
        headerColor: '#F2F2F2',
        level,
        invalidMessage,
        translator,
      },
      brush: brushSettings,
    },
  ];

  if (treemapLegend && showLegend === true) {
    components.push(...treemapLegend.components);
    gestures.unshift(...treemapLegend.interactions);
  }

  components.push(tooltip({ level, layout, formatter }));

  components.push(...selectables.components);

  const interactions = [...tooltipInteraction(actions), gesturesToInteractions(interactionType, gestures)];

  return {
    collections,
    scales,
    components,
    interactions,
    palettes: colorService.getPalettes(),
    strategy: dockLayout(layout, options),
  };
};
