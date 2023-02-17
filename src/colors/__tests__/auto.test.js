import { auto } from '../auto';

describe('auto color', () => {
  it('should use defaultAuto when only one dimension', () => {
    const defaultAuto = () => 'defaultAuto';
    const layout = {
      qHyperCube: {
        qDimensionInfo: [{}],
        qMeasureInfo: [],
      },
    };
    const result = auto({ defaultAuto, layout });
    expect(result).toEqual('defaultAuto');
  });

  it('should use color by dim when using multiple dimensions', () => {
    const defaultAuto = () => 'defaultAuto';
    const layout = {
      qHyperCube: {
        qDimensionInfo: [{ qCardinalities: { qHypercubeCardinal: 4 } }, { qCardinalities: { qHypercubeCardinal: 6 } }],
        qMeasureInfo: [],
      },
    };
    const result = auto({ defaultAuto, layout });
    expect(result).toMatchInlineSnapshot(`
      {
        "byDimDef": {
          "activeDimensionIndex": 0,
        },
        "mode": "byDimension",
        "persistent": false,
        "useDimColVal": true,
      }
    `);
  });
});
