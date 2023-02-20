import { fixNativeLegend } from './nativeLegend';

export const legend = ({ colorService, chart, layout, rtl, viewState, actions }) => {
  const navigationDisabled = !actions?.interact?.enabled();
  const treemapLegend = colorService.getLegend(
    {
      eventName: 'legend',
      key: 'legend',
      viewState,
      chart,
      styleReference: 'object.treemap',
      rtl,
    },
    { actions, navigationDisabled }
  );

  fixNativeLegend(treemapLegend, colorService, layout);
  return treemapLegend;
};
