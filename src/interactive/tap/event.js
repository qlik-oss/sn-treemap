function eventToLocalPoint(event, chart) {
  const bounds = chart.element.getBoundingClientRect();

  let x;
  let y;
  if (event.center) {
    ({ x } = event.center);
    ({ y } = event.center);
  } else {
    x = event.clientX;
    y = event.clientY;
  }

  return {
    x: x - bounds.left,
    y: y - bounds.top,
  };
}

const tap = ({ targets, requireFailure, recognizeWith, components, eventName = 'tap' }, opts) => {
  let targetComponents;
  const customTooltipUtils = opts.customTooltipModel ? opts.customTooltipModel.utils : undefined;
  const debouncedDisplayCustomTooltip = customTooltipUtils
    ? opts.debouncer(customTooltipUtils.displayTooltip, customTooltipUtils.DEBOUNCE_THRESHOLD)
    : undefined;

  return {
    key: 'event:tap',
    type: 'Tap',
    requireFailure,
    recognizeWith,
    options: {
      event: eventName,
      interval: 10,
      pointers: 1,
      enable(r, e) {
        if (!e) {
          return true;
        }

        if (!opts.actions.select.enabled() && !opts.actions.tooltip.enabled()) {
          return false;
        }

        targetComponents = this.chart
          .componentsFromPoint({ x: e.center.x, y: e.center.y })
          .filter((c) => targets.indexOf(c.key) !== -1);

        return targetComponents.length > 0;
      },
    },
    events: {
      [eventName](e) {
        e.preventDefault();
        const localPoint = eventToLocalPoint(e, this.chart);
        const hitRadius = opts.hitRadius ? opts.hitRadius(targetComponents) : 0;
        const shape = hitRadius > 0 ? { cx: localPoint.x, cy: localPoint.y, r: hitRadius } : localPoint;

        const shapes = opts.shapesAt
          ? opts.shapesAt(shape)
          : this.chart.shapesAt(shape, {
              components: targets.map((c) => ({ key: c, propagation: 'stop' })),
              propagation: 'stop',
            });

        const tooltip = this.chart.component('tooltip');
        const doTooltip = e.pointerType !== 'mouse' && tooltip && tooltip.show;

        const doSelect = !opts.isLocked(targetComponents) && !opts.tooltipOnly && opts.actions.select.enabled();

        if (doSelect) {
          const compsAtPoint = this.chart.componentsFromPoint({ x: e.center.x, y: e.center.y });
          const isLegend = compsAtPoint.some((c) => c.type === 'legend-cat');

          if (shapes.length || !isLegend) {
            this.chart.brushSelectionIncludeMax = false;
            opts.actions.select.brushSelectionIncludeMax = false; // eslint-disable-line no-param-reassign
            opts.actions.select.emit('start', eventName, compsAtPoint);
          }

          if (shapes.length && components) {
            this.chart.brushSelectionIncludeMax = false;
            opts.actions.select.brushSelectionIncludeMax = false; // eslint-disable-line no-param-reassign
            const comps = typeof components === 'function' ? components(e, shapes) : components;
            this.chart.brushFromShapes(shapes, {
              components: comps,
            });
            opts.actions.select.emit('end', eventName);
          }
        }

        if (tooltip && opts.actions.tooltip.enabled()) {
          if (shapes.length) {
            const { customTooltipModel } = opts;
            if (
              customTooltipModel?.useCustomTooltip &&
              customTooltipUtils.checkIfPromisesExist({ customTooltipModel })
            ) {
              const nodes = customTooltipUtils.getNodes(e, this.chart);
              debouncedDisplayCustomTooltip(e, tooltip, { nodes, opts, customTooltipModel });
            } else {
              tooltip.emit('show', e, { nodes: shapes });
            }
          } else if (doTooltip) {
            tooltip.emit('hide');
          }
        }
      },
    },
  };
};

export default tap;
