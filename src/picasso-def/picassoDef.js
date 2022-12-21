import { getLevel, getNextSelecteDim } from './getLevel';
import ChartFormatting from './formatting/chart-formatting';
import { legend } from './legend';
import createSelectables from './selectables';
import createTooltipService from './tooltip/service';
import { active, inactive } from './brushStyles';
import { dockLayout } from './dock-layout';
import gesturesToInteractions from './gesturesToInteractions';
import { getBlockingDisclaimer, getInfoDisclaimer } from './disclaimers';
import { getTreeDataCollection } from './tree-data-collection';

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
  viewState,
  colorService,
  chart,
  options,
  actions,
  customTooltipService,
  properties,
  rtl,
}) => {
  const blockingDisclaimer = getBlockingDisclaimer(layout, translator);
  if (blockingDisclaimer) {
    return {
      components: [blockingDisclaimer],
      strategy: dockLayout(layout, options),
    };
  }

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

  const treemapLegend = legend({ colorService, chart, layout, rtl, viewState });
  const selectables = createSelectables({
    actions,
    colorService,
    isDimensionLocked: false,
    isSingleSelectionmodels: false,
    scales,
    legendComponent: treemapLegend?.components[0],
  });
  const gestures = selectables.gestures.sort((a, b) => (b.prio || 0) - (a.prio || 0));

  const tooltipService = createTooltipService({
    chart,
    actions,
    translator,
    rtl,
    colorService,
    theme,
    custom: customTooltipService,
    properties,
    level,
    layout,
    formatter,
  });

  const collections = [getTreeDataCollection({ colorService, layout, selectLevel })];

  const brushSettings = {
    consume: [
      {
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
        headerColor: '#F2F2F2',
        level,
        invalidMessage,
        translator,
        theme,
        rtl: options.direction === 'rtl',
      },
      brush: brushSettings,
    },
  ];

  if (treemapLegend && showLegend === true) {
    components.push(...treemapLegend.components);
    gestures.unshift(...treemapLegend.interactions);
  }

  components.push(...tooltipService.getComponents());
  const tooltipInteractions = tooltipService.getInteractions();
  gestures.push(...tooltipInteractions.gestures);

  components.push(...selectables.components);

  const infoDiscalimer = getInfoDisclaimer(layout, translator);
  if (infoDiscalimer) {
    components.push(infoDiscalimer);
  }

  const interactions = [tooltipInteractions.native, gesturesToInteractions(interactionType, gestures)];

  return {
    collections,
    scales,
    components,
    interactions,
    palettes: colorService.getPalettes(),
    strategy: dockLayout(layout, options),
  };
};
