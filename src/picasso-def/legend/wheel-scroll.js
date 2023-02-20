function doScroll(e, comp) {
  // To make it the same as the old one, always scroll by item intead of pixel
  const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
  const dir = delta >= 0 ? 'next' : 'prev';
  comp.emit(dir);
}

export default function native({ actions, chart }) {
  return {
    type: 'native',
    events: {
      wheel(e) {
        if (actions.interact.enabled()) {
          const [target] = chart.componentsFromPoint(e).filter((c) => c.key === 'legend-cat');
          if (target) {
            e.preventDefault();
            doScroll(e, target);
          }
        }
      },
    },
  };
}
