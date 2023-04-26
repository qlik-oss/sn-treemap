import { fixNativeLegend } from './nativeLegend';

export const legend = ({ colorService, chart, layout, rtl, viewState, actions, styleService }) => {
  const navigationDisabled = !actions?.interact?.enabled();

  const treemapLegend = colorService.getLegend(
    {
      eventName: 'legend',
      key: 'legend',
      viewState,
      chart,
      styleReference: 'object.treemap',
      styleOverrides: {
        title: styleService.legend.title.getStyle(),
        label: styleService.legend.label.getStyle(),
      },
      rtl,
    },
    { actions, navigationDisabled }
  );

  fixNativeLegend(treemapLegend, colorService, layout);
  return treemapLegend;
};
