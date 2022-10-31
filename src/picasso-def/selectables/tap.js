import { debouncer } from 'qlik-chart-modules';
import { tap } from '../../interactive';

export default function createTap({ actions, colorService, isDimensionLocked, isSingleSelection }) {
  const targets = ['treemap', 'legend-cat'];

  const brushFromShapesConfig = (e, shapes) => {
    const [shape] = shapes;
    const { key } = shape;

    const component = {
      key,
      action: e.srcEvent.ctrlKey || isSingleSelection ? 'set' : 'toggle',
      contexts: ['selection'],
    };

    if (key === 'treemap') {
      component.data = ['select'];
    }

    return [component];
  };

  const config = {
    targets,
    components: brushFromShapesConfig,
  };

  const options = {
    actions,
    isLocked: (components) =>
      components.some((component) => component.type === 'legend-cat')
        ? colorService.isSelectionLocked({ isMeasureSelectionLocked: true })
        : isDimensionLocked,
    debouncer,
  };

  return tap(config, options);
}
