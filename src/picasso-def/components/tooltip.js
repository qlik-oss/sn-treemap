export const tooltip = () => ({
  require: ['chart', 'renderer', 'element'],
  on: {
    touchstart(e) {
      const {content} = this.settings;
      const point = {
        x: e.clientX,
        y: e.clientY,
      };
      const s = this.chart.shapesAt(point);
      const index = s.length >= 2 ? 1 : 0;
      if (s.length >= 1) {
        const rect = s[index];
        point.x = rect.x;
        point.y = rect.y;
        point.rect = rect;
        point.tap = e;
        point.content = content(s, index);
        this.chart.element.emit('onTooltipData', point);
      }
    },
  },

  render({data}) {
    return [];
  },
});
