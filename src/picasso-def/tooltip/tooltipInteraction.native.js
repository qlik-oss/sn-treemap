export const tooltipInteraction = () => [
  {
    type: 'native',
    key: 'native',
    events: {
      touchstart(e) {
        const tooltip = this.chart.component('tooltip');
        if (tooltip) {
          tooltip.emit('touchstart', e);
        }
      },
    },
  },
];
