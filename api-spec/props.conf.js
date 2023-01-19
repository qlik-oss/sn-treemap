module.exports = {
  fromJsdoc: {
    glob: ['./src/object-definition.js'],
    api: {
      stability: 'stable',
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
