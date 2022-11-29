/* eslint-disable no-underscore-dangle */

import { __DO_NOT_USE__ as NebualInternals } from '@nebula.js/stardust';
import { picassoDef } from '../picasso-def/picassoDef';
import testdata from './testdata.json';

describe('Treemap picassodef render', () => {
  const { theme: themeFn } = NebualInternals;
  it('should render ok', () => {
    const layout = testdata.qLayout[0].value;
    const _theme = themeFn();
    const colorService = {
      getDatumProps: () => ({
        color: {
          field: 'qMeasureInfo/0',
        },
        expressionColor: undefined,
        expressionColorText: undefined,
      }),
      getScales: () => ({
        color: {
          data: {
            extract: { field: 'qMeasureInfo/0' },
          },
          range: ['#ec983d', '#deb357', '#d0ce71', '#c3ea8c', '#8ed195', '#5ab89e', '#26a0a7'],
          type: 'color',
        },
      }),
      getColor: () => undefined,
      getLegend: () => undefined,
      getPalettes: () => undefined,
      getSettings: () => ({}),
    };
    const data = picassoDef({ layout, theme: _theme.externalAPI, env: {}, colorService });
    expect(data).toMatchSnapshot();
  });
});
