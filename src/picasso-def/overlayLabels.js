export const overlayLables = () => ({
  type: 'labels',
  key: 'overlay',
  layout: {
    displayOrder: 10,
  },
  settings: {
    sources: [
      {
        component: 'treemap',
        selector: 'rect',
        strategy: {
          type: 'rows',
          settings: {
            fontFamily: 'arial',
            fontSize: 24,
            justify: 0.5,
            align: 0.5,
            padding: 8,
            labels: [
              {
                wordBreak: 'break-word',
                fill: (d) => {
                  if (d?.data?.overlayLabel && d.data.color) {
                    return d.data.color;
                  }
                  return 'rgba(0, 0, 0, 0.5)';
                },
                label: (d) => d?.data?.overlayLabel || '',
              },
            ],
          },
        },
      },
    ],
  },
});
