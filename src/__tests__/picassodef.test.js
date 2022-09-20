/* eslint-disable no-underscore-dangle */

import {__DO_NOT_USE__ as NebualInternals}  from '@nebula.js/stardust';
// eslint-disable-next-line import/no-unresolved
import theme from '@qlik-trial/sense-themes-default/dist/horizon/theme.json';
import { picassoDef } from '../picasso-def/picassoDef';
import testdata from './testdata.json';

describe('Treemap picassodef render', () => {
  const { theme: themeFn } = NebualInternals;
  it('should render ok', () => {
    const layout = testdata.qLayout[0].value;
    const _theme = themeFn();
    _theme.internalAPI.setTheme(theme, 'horizon');
    const data = picassoDef({layout, theme:_theme.externalAPI, env: {}});
    expect(data).toMatchSnapshot();
  })
})
