export const lassoBrush = () => ({
  key: 'lasso',
  type: 'brush-lasso',
  settings: {
    brush: {
      components: [
        {
          key: 'treemap',
          data: ['select'],
          contexts: ['dataContext'],
          action: 'add',
        },
      ],
    },
  },
});
