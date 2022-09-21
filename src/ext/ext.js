import pp from './property-definition';

function hasValidLayout(layout) {
  return (
    layout &&
    !(
      layout.qHyperCube.qMeasureInfo.every((measure) => measure.qMax <= 0 && measure.qMax >= measure.qMin) ||
      layout.qHyperCube.qSize.qcy === 0
    )
  );
}

export default function ext(env) {
  return {
    definition: pp(env),
    // TODO soft properties
    support: {
      cssScaling: false,
      snapshot: hasValidLayout,
      export: hasValidLayout,
      exportData: true,
      sharing: hasValidLayout,
      viewData: true,
    },
    // TODO: object conversion
  };
}
