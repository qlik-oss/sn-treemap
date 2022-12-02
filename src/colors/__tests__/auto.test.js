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
        qDimensionInfo: [{ qStateCounts: { qSelected: 0 } }, { qStateCounts: { qSelected: 0 } }],
        qMeasureInfo: [],
      },
    };
    const result = auto({ defaultAuto, layout });
    expect(result).toMatchInlineSnapshot(`
      Object {
        "byDimDef": Object {
          "activeDimensionIndex": 0,
        },
        "mode": "byDimension",
        "persistent": false,
        "useDimColVal": true,
      }
    `);
  });
});
