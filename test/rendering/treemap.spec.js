import path from 'path';
import { TestGenerator } from '../utils';

TestGenerator.fromFixtures({
  suiteName: 'Treemap',
  serveConfig: {
    type: 'treemap',
    entry: path.resolve(__dirname, '../../dist/sn-treemap.js'),
    port: 8017,
  },
  fixturePath: path.join(__dirname, '__fixtures__'),
  styles: [
    { fixture: 'theming_global', styles: [['.njs-viz', 'background', '#272822']] },
    { fixture: 'theming_scoped', styles: [['.njs-viz', 'background', '#272822']] },
  ],
});
