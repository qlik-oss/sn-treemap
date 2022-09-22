export const catLegend = ({ color }) => {
  const scales = {
    cat: {
      type: 'categorical-color',
      data: {
        extract: { field: color.data.extract.field },
        filter: (f) => f.value >= 0,
      },
      range: (f) => f.data.items.map((d) => color.range[d.value]),
    },
  };
  const component = {
    type: 'legend-cat',
    scale: 'cat',
    dock: 'bottom',
    settings: {
      layout: {
        size: 8,
      },
    },
  };
  return { scales, component };
};
