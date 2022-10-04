export const fixNativeLegend = (treemapLegend, colorService, layout) => {
  if (!treemapLegend) {
    return;
  }

  // remove interactions in case they don't work
  treemapLegend.interactions = [];

  for (let i = 0; i < treemapLegend.components.length; ++i) {
    if (treemapLegend.components[i].type === 'legend-cat') {
      // Replace with native component
      const component = {
        type: 'nativeLegend',
        scale: 'cat',
        key: 'nativeCat',
        dock: 'bottom',
        settings: {
          persistent: layout.color.persistent || layout.color.useDimColVal,
        },
        data: {
          extract: {
            field: colorService.getSettings().field,
            filter: (f) => f.qElemNo >= 0,
            trackBy: (d) => d.qElemNo,
          },
        },
      };
      treemapLegend.components[i] = component;
    }
  }
};
