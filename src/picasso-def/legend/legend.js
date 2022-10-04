import { fixNativeLegend } from './nativeLegend';

export const legend = ({ colorService, chart, layout }) => {
  const treemapLegend = colorService.getLegend(
    {
      eventName: 'legend',
      key: 'legend',
      // viewState: opts.viewState,
      chart,
      styleReference: 'object.treemap',
      // rtl: context.rtl,
    }
    // { navigationDisabled }
  );

  fixNativeLegend(treemapLegend, colorService, layout);
  return treemapLegend;
};
