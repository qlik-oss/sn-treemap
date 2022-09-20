export const catLegend = ({color, layout}) => {
  const scales = {
    cat: {
      type: 'categorical-color',
      data: {
        extract: {field: color.data.extract.field},
        filter: (f) => f.value >= 0,
      },
      range: color.range,
    },
  };
  const component = {
    type: 'nativeLegend',
    scale: 'cat',
    key: 'nativeCat',
    dock: 'bottom',
    settings: {
      persistent: layout.color.persistent || layout.color.useDimColVal,
    },
    data: {
      extract: {
        field: color.data.extract.field,
        filter: (f) => f.qElemNo >= 0,
        trackBy: (d) => d.qElemNo,
      },
    },
  };
  return {scales, component};
};
