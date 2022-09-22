import objectDefinition from './object-definition';

export const qae = {
  data: {
    targets: [
      {
        path: '/qHyperCubeDef',
        dimensions: {
          min: 1,
        },
        measures: {
          min: 1,
        },
      },
    ],
  },
  properties: objectDefinition(),
};
