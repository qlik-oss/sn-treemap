export const picassoSelections = ({
  selectBrush,
  picassoQ,
  selections,
  lasso,
}) => {
  const valueInterceptor = (added) => {
    const brushes = selectBrush.brushes();
    brushes.forEach((b) => {
      if (b.type === 'range') {
        // has range selections
        selectBrush.clear([]);
      }
    });
    return added.filter((t) => t.value >= 0) // do not allow selection on null or negative value
  };

  const rangeInterceptor = (a) => {
    const v = selectBrush.brushes().filter((b) => b.type === 'value');
    if (v.length) {
      // has dimension values selected
      selectBrush.clear([]);
      return a;
    }
    return a;
  };

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

  selectBrush.intercept('set-ranges', rangeInterceptor);
  selectBrush.intercept('toggle-ranges', rangeInterceptor);

  selectBrush.intercept('toggle-values', valueInterceptor);
  selectBrush.intercept('set-values', valueInterceptor);
  selectBrush.intercept('add-values', valueInterceptor);
};
