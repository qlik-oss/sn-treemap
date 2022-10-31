import createTap from './tap';
import createLasso from './lasso';

export default function createSelectables(options) {
  const { isSingleSelection } = options;
  const tap = createTap(options);
  if (isSingleSelection) {
    return {
      components: [...tap.components],
      gestures: [...tap.interactions],
    };
  }
  const lasso = createLasso(options);

  return {
    components: [...tap.components, ...lasso.components],
    gestures: [...tap.interactions, ...lasso.interactions],
  };
}
