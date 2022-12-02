import { fixNativeLegend } from './nativeLegend';

export const legend = ({ colorService, chart, layout, rtl, viewState }) => {
  const treemapLegend = colorService.getLegend(
    {
      eventName: 'legend',
      key: 'legend',
      viewState,
      chart,
      styleReference: 'object.treemap',
      rtl,
    }
    // { navigationDisabled }
  );

  fixNativeLegend(treemapLegend, colorService, layout);
  return treemapLegend;
};
