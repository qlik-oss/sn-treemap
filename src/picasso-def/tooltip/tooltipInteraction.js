export const tooltipInteraction = () => [
  {
    type: 'native',
    key: 'native',
    events: {
      mousemove(e) {
        const tooltip = this.chart.component('tooltip');
        if (tooltip) {
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
