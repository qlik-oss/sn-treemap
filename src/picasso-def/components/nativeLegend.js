export const nativeLegend = () => ({
  require: ['chart', 'renderer', 'element'],
  preferredSize() {
    return 68;
  },
  mounted() {
    this.chart.element.mountCatLegend(this.data.fields[0].title());
  },
  render({ data }) {
    const { persistent } = this.settings.settings;
    const colorScale = this.chart.scale(this.settings.scale);

    const range = colorScale.range();
    const items = data.items.map((item, index) => ({
      label: item.label,
      color: range[(persistent ? item.value : index) % range.length],
    }));
    this.chart.element.setCatLegendData(items);
    return [
      {
        type: 'rect',
        x: 0,
        y: 0,
        width: this.rect.width,
        height: this.rect.height,
        fill: 'black',
        opacity: 0,
      },
    ];
  },
});
