import conversion from 'qlik-object-conversion';
import pp from './property-definition';
import dataDefinition from './data-definition';
import softDefinition from './explore-definition';

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
    softDefinition,
    support: {
      cssScaling: false,
      snapshot: hasValidLayout,
      export: hasValidLayout,
      exportData: true,
      sharing: hasValidLayout,
      viewData: true,
    },
    importProperties: (exportFormat, initialProperties, extension) => {
      const propertyTree = conversion.colorChart.importProperties({
        exportFormat,
        initialProperties,
        dataDefinition: dataDefinition(env),
        defaultPropertyValues: {
          defaultDimension: extension.getDefaultDimensionProperties(),
          defaultMeasure: extension.getDefaultMeasureProperties(),
        },
      });
      propertyTree.qProperty.qHyperCubeDef.qAlwaysFullyExpanded = true;
      return propertyTree;
    },
    exportProperties: (propertyTree) => conversion.colorChart.exportProperties({ propertyTree }),
  };
}
