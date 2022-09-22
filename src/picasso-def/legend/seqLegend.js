export const seqLegend = ({ color, layout }) => {
  const scales = {
    seqFill: {
      type: 'sequential-color',
      data: { field: 'qMeasureInfo/0' },
      range: color.range,
    },
    seqMajor: {
      type: 'color',
      data: { field: 'qMeasureInfo/0' },
    },
  };

  const component = {
    type: 'legend-seq',
    key: 'legend',
    dock: 'bottom',
    settings: {
      fill: 'seqFill',
      major: 'seqMajor',
      title: {
        show: layout.legend.showTitle === true,
        maxLines: 4,
        wordBreak: 'break-word',
      },
    },
  };
  return { scales, component };
};
