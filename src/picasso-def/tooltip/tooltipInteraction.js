export const tooltipInteraction = (constraints) => [
  {
    type: 'native',
    key: 'native',
    events: {
      mousemove(e) {
        const tooltip = this.chart.component('tooltip');
        if (tooltip && !constraints?.passive) {
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
