import { getSections } from '../section';

describe('tooltip section', () => {
  let testFn;
  beforeEach(() => {
    const layout = {
      qHyperCube: {
        qDimensionInfo: { length: 1 },
        qMeasureInfo: [{ qFallbackTitle: 'measure label' }],
      },
    };
    const custom = {
      hideBasic: () => false,
      isEnabled: () => false,
      chart: {
        isEnabled: () => false,
      },
    };
    const chart = {};
    let colorSettings = {
      fieldType: false,
      field: undefined,
    };
    const colorService = {
      getColor:
        () =>
        ({ datum }) =>
          datum.fill,
      getSettings: () => colorSettings,
    };

    const section = getSections({ layout, custom, chart, colorService });

    const dataset = undefined;
    const h = undefined;
    const create = {
      text: ({ value }) => ({ type: 'text', value }),
      color: ({ nodes, property, fillColor }) => ({
        type: 'color',
        color: colorService.getSettings().fieldType ? fillColor || nodes[0].data[property] : undefined,
      }),
      measure: ({ label, value }) => ({ type: 'measure', label, value }),
    };

    testFn = (data, options) => {
      if (options?.dimCount) {
        layout.qHyperCube.qDimensionInfo.length = options.dimCount;
      }
      if (options?.colorSettings) {
        colorSettings = options.colorSettings;
      }
      if (options?.hideBasic) {
        custom.hideBasic = () => true;
      }
      return section({ h, nodes: [{ data }], dataset, create });
    };
  });

  it('normal tooltip', () => {
    const data = {
      depth: 1,
      fill: { value: 1, label: 'C' },
      label: 'f',
      size: { value: 135.89156626506025, label: '135,89' },
      source: { key: 'qHyperCube', field: 'qDimensionInfo/0' },
    };

    const result = testFn(data);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "type": "text",
          "value": "f",
        },
        {
          "color": undefined,
          "type": "color",
        },
        {
          "label": "measure label",
          "type": "measure",
          "value": "135,89",
        },
      ]
    `);
  });

  it('tooltip for second dimension of 2', () => {
    const data = {
      depth: 2,
      fill: { value: 5, label: 'd' },
      label: 'd',
      next: {
        label: 'B',
        source: { key: 'qHyperCube', field: 'qDimensionInfo/0' },
      },
      size: { value: 1.4350282485875707, label: '1,44' },
      source: { key: 'qHyperCube', field: 'qDimensionInfo/1' },
    };
    const colorSettings = {
      field: 'qDimensionInfo/1',
      fieldType: 'dimension',
    };

    const result = testFn(data, { dimCount: 2, colorSettings });
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "type": "text",
          "value": "d, B",
        },
        {
          "color": {
            "label": "d",
            "value": 5,
          },
          "type": "color",
        },
        {
          "label": "measure label",
          "type": "measure",
          "value": "1,44",
        },
      ]
    `);
  });

  it('tooltip for first dimension of 2', () => {
    const data = {
      depth: 1,
      fill: { value: 1, label: 'C' },
      label: 'C',
      next: {
        label: '',
      },
      size: { value: 0, label: '' },
      source: { key: 'qHyperCube', field: 'qDimensionInfo/0' },
    };
    const colorSettings = {
      field: 'qDimensionInfo/0',
      fieldType: 'dimension',
    };

    const result = testFn(data, { dimCount: 2, colorSettings });
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "type": "text",
          "value": "C",
        },
        {
          "color": {
            "label": "C",
            "value": 1,
          },
          "type": "color",
        },
      ]
    `);
  });

  it('tooltip for first dimension of 2 with hide basic', () => {
    const data = {
      depth: 1,
      fill: { value: 1, label: 'C' },
      label: 'C',
      next: {
        label: '',
      },
      size: { value: 0, label: '' },
      source: { key: 'qHyperCube', field: 'qDimensionInfo/0' },
    };
    const colorSettings = {
      field: 'qDimensionInfo/0',
      fieldType: 'dimension',
    };

    const result = testFn(data, { dimCount: 2, colorSettings, hideBasic: true });
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "type": "text",
          "value": "C",
        },
      ]
    `);
  });

  it('tooltip for first dimension of 2 using color by attr dimension', () => {
    const data = {
      depth: 1,
      fill: { value: 1, label: 'C' },
      label: 'f',
      next: {
        label: '',
      },
      size: { value: 0, label: '' },
      source: { key: 'qHyperCube', field: 'qDimensionInfo/0' },
    };
    const colorSettings = {
      field: 'qDimensionInfo/1/qAttrDimInfo/0',
      fieldType: 'dimension',
    };

    const result = testFn(data, { dimCount: 2, colorSettings });
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "type": "text",
          "value": "f",
        },
      ]
    `);
  });

  it('tooltip for second dimension of 3 using color for first dimension', () => {
    const data = {
      depth: 2,
      label: 'B',
      next: {
        label: 'c',
        fill: { value: 0, label: 'c' },
        source: { key: 'qHyperCube', field: 'qDimensionInfo/0' },
      },
      size: { value: 0, label: '' },
      source: { key: 'qHyperCube', field: 'qDimensionInfo/1' },
    };
    const colorSettings = {
      field: 'qDimensionInfo/0',
      fieldType: 'dimension',
    };

    const result = testFn(data, { dimCount: 3, colorSettings });
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "type": "text",
          "value": "B, c",
        },
        {
          "color": {
            "label": "c",
            "value": 0,
          },
          "type": "color",
        },
      ]
    `);
  });
});
