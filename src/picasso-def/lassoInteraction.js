export const lassoInteraction = ({ constraints, interactionType, picassoQ, selectionsApi }) => [
  {
    type: interactionType,
    key: 'hammer',
    enable: () => !constraints?.select && !constraints?.active,
    gestures: [
      {
        type: 'Pan',
        events: {
          panstart: function onPanStart(e) {
            this.chart.component('lasso').emit('lassoStart', e);
          },
          pan: function onPan(e) {
            this.chart.component('lasso').emit('lassoMove', e);
          },
          panend: function onPanEnd(e) {
            this.chart.component('lasso').emit('lassoEnd', e);
            const brush = this.chart.brush('dataContext');
            if (brush && selectionsApi) {
              setTimeout(() => {
                const generated = picassoQ.selections(brush, {});
                generated.forEach((s) => {
                  if (s?.params?.[0]?.startsWith('/0/')) {
                    s.params[0] = '/qHyperCubeDef';
                  }
                  selectionsApi.select(s);
                });
              }, 0);
            }
          },
        },
      },
    ],
  },
];
