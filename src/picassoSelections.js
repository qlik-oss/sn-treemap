export const picassoSelections = ({ selectBrush, picassoQ, selections, lasso }) => {
  if (!lasso) {
    selectBrush.on('update', async (added) => {
      if (!selections.isActive() && added.length > 0) {
        await selections.begin(['/qHyperCubeDef']);
      }
      if (selections.isActive()) {
        try {
          const generated = picassoQ.selections(selectBrush, {});
          generated.forEach((s) => {
            if (s?.params?.[0]?.startsWith('/0/')) {
              s.params[0] = '/qHyperCubeDef';
            }
            selections.select(s);
          });
        } catch (error) {
          console.error('Failed to apply selections', error);
        }
      }
    });
  }
};
