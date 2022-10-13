import { getLevel, getNextSelecteDim } from './getLevel';
import ChartFormatting from './formatting/chart-formatting';
import { legend } from './legend';
import { lassoBrush } from './lassoBrush';
import { lassoInteraction } from './lassoInteraction';
import { tooltip, tooltipInteraction } from './tooltip';
import { active, inactive } from './brushStyles';
import { dockLayout } from './dock-layout';

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

export const expressionIsColor = (layout) => {
  let expressionColor;
  let expressionColorText;
  if (layout.color.mode === 'byExpression' && layout.color.expressionIsColor) {
    expressionColor = {
      field: 'qMeasureInfo/0/qAttrExprInfo/0',
    };
    expressionColorText = {
      field: 'qMeasureInfo/0/qAttrExprInfo/0',
      value: (v) => {
        const a = v?.qText.slice(1) || '0';
        return parseInt(a, 16);
      },
    };
  }

  return { expressionColor, expressionColorText };
};

export const picassoDef = ({
  layout,
  theme,
  env,
  picassoQ,
  selectionsApi,
  showLegend,
  invalidMessage,
  translator,
  colorService,
  chart,
  options,
  constraints,
}) => {
  if (!layout.qHyperCube) {
    return {};
  }
  const level = getLevel(layout);
  const dimLevel = getNextSelecteDim(layout);
  const selectLevel = Math.min(level, dimLevel);
  const interactionType = env.carbon ? 'kinesics' : 'hammer';
  const interactions = [
    ...tooltipInteraction(constraints),
    ...lassoInteraction({ constraints, interactionType, picassoQ, selectionsApi }),
  ];
  const { qMeasureInfo } = layout.qHyperCube;

  const formatter = getFormatterForMeasures('', qMeasureInfo.length, qMeasureInfo);

  const scales = colorService.getScales();

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

  const allowSelections = !constraints?.select && !constraints?.active;

  const brushSettings = {
    trigger: [
      {
        on: 'tap',
        contexts: ['dataContext'],
        data: ['select'],
      },
    ],
    consume: [
      {
        filter: (d) => d?.data?.select?.value > -1,
        context: 'dataContext',
        data: ['select'],
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
      brush: allowSelections ? brushSettings : undefined,
    },
  ];

  const treemapLegend = legend({ colorService, chart, layout });
  if (treemapLegend && showLegend === true) {
    components.push(...treemapLegend.components);
    interactions[1].gestures.push(...treemapLegend.interactions);
  }

  components.push(tooltip({ level, layout, formatter }));

  components.push(lassoBrush());

  return {
    collections,
    scales,
    components,
    interactions,
    palettes: colorService.getPalettes(),
    strategy: dockLayout(layout, options),
  };
};
