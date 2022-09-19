export const tooltip = ({level, layout}) => ({
  key: 'tooltip',
  type: 'tooltip',
  settings: {
    duration: 2500,
    placement: {
      type: 'bounds',
      area: 'target',
    },
    extract: (n) => ({
      value: n.node.data,
    }),
    content: ({h, data}) => {
      let label = data[0].value.label;
      if (level !== 0) {
        label = '';
        const stack = [];
        const recurse = (n, l) => {
          if (n) {
            stack.push(n.label);
          }
          if (n) {
            recurse(n.next, l + 1);
          }
        };
        const cl = 0;
        recurse(data[1].value, cl);
        const remove = layout.qHyperCube.qDimensionInfo.length - level - 1;
        stack.splice(0, remove);
        label = stack.join(', ');
      }
      if (level !== layout.qHyperCube.qDimensionInfo.length - 1) {
        return h(
          'div',
          {},
          h(
            'div',
            {style: {'font-size': '14px', 'font-weight': 'bold'}},
            label,
          ),
        );
      }
      const display = `${layout.qHyperCube.qMeasureInfo[0].qFallbackTitle}: ${data[1].value.value}`;
      return h(
        'div',
        {},
        h(
          'div',
          {
            style: {
              'font-size': '14px',
              'margin-bottom': '8px',
              'font-weight': 'bold',
            },
          },
          label,
        ),
        h('div', {}, display),
      );
    },
  },
});
