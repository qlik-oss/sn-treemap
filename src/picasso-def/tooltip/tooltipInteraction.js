export const tooltipInteraction = (actions) => [
  {
    type: 'native',
    key: 'native',
    events: {
      mousemove(e) {
        const tooltip = this.chart.component('tooltip');
        if (tooltip && actions?.tooltip.enabled()) {
          tooltip.emit('show', e);
        }
      },
      mouseleave() {
        const tooltip = this.chart.component('tooltip');
        if (tooltip) {
          tooltip.emit('hide');
        }
      },
    },
  },
];
