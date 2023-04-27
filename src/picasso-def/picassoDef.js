import { getNextSelectLevel } from './getLevel';
import { legend } from './legend';
import createSelectables from './selectables';
import createTooltipService from './tooltip/service';
import { active, inactive } from './brushStyles';
import { dockLayout } from './dock-layout';
import gesturesToInteractions from './gesturesToInteractions';
import { getBlockingDisclaimer, getInfoDisclaimer } from './disclaimers';
import { getTreeDataCollection } from './tree-data-collection';
import legendWheelScroll from './legend/wheel-scroll';

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
  dataset,
  styleService,
}) => {
  const blockingDisclaimer = getBlockingDisclaimer(layout, translator, rtl);
  if (blockingDisclaimer) {
    return {
      components: [blockingDisclaimer],
      strategy: dockLayout(layout, options),
    };
  }

  if (!layout.qHyperCube) {
    return {};
  }
  const selectLevel = getNextSelectLevel(layout);
  const interactionType = env.carbon ? 'kinesics' : 'hammer';

  const scales = colorService.getScales();

  const treemapLegend = legend({ colorService, chart, layout, rtl, viewState, actions, styleService });
  const selectables = createSelectables({
    actions,
    colorService,
    isDimensionLocked: selectLevel === -1,
    isSingleSelection: selectLevel !== -1 && layout.qHyperCube.qDimensionInfo[selectLevel].qIsOneAndOnlyOne,
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
    level: selectLevel,
    layout,
  });

  const collections = [getTreeDataCollection({ colorService, layout, selectLevel, dataset })];

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
        selectLevel,
        invalidMessage,
        translator,
        theme,
        rtl: options.direction === 'rtl',
        styleService,
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

  const infoDiscalimer = getInfoDisclaimer(layout, translator, rtl);
  if (infoDiscalimer) {
    components.push(infoDiscalimer);
  }

  const wheelScroll = legendWheelScroll({ actions, chart });
  const interactions = [tooltipInteractions.native, wheelScroll, gesturesToInteractions(interactionType, gestures)];

  return {
    collections,
    scales,
    components,
    interactions,
    palettes: colorService.getPalettes(),
    strategy: dockLayout(layout, options),
  };
};
