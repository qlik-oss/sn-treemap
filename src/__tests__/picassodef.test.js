/* eslint-disable no-underscore-dangle */

import { __DO_NOT_USE__ as NebualInternals } from '@nebula.js/stardust';
import { picassoDef } from '../picasso-def/picassoDef';
import testdata from './testdata.json';

describe('Treemap picassodef render', () => {
  const { theme: themeFn } = NebualInternals;
  it('should render ok', () => {
    const layout = testdata.qLayout[0].value;
    const _theme = themeFn();
    const data = picassoDef({ layout, theme: _theme.externalAPI, env: {} });
    expect(data).toMatchSnapshot();
  });
});
