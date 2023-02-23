const path = require('path');

const pkg = require(path.resolve(__dirname, '../package.json')); // eslint-disable-line

module.exports = {
  fromJsdoc: {
    glob: ['./src/object-definition.js'],
    api: {
      stability: 'stable',
      properties: {
        'x-qlik-visibility': 'public',
      },
      visibility: 'public',
      name: `${pkg.name}:properties`,
      version: pkg.version,
      description: 'Treemap generic object definition',
    },
    output: {
      sort: {
        alpha: true,
      },
      file: './api-spec/spec.json',
    },
    parse: {
      types: {
        HyperCubeDef: {},
        NxDimension: {},
        NxMeasure: {},
        NxInlineDimensionDef: {},
        NxInlineMeasureDef: {},
        NxAttrDimDef: {},
        NxAttrExprDef: {},
        StringExpression: {},
        ValueExpression: {},
      },
    },
  },
};
