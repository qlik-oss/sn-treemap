import { setValue, getValue } from 'qlik-chart-modules';

function setColorVars(data, handler) {
  const dims = handler.getDimensions();
  const measures = handler.getMeasures();
  const mode = getValue(data, 'color.mode');
  if (dims.length > 1 && data.color) {
    data.color.persistent = true;
  } else if (mode === 'byExpression' && measures.length === 0) {
    setValue(data, 'color.mode', 'primary');
  }
}

function setMoveSort(handler) {
  let index;

  if (handler.getDimensions().length > 1) {
    index = handler.getSorting().indexOf(0);
    if (index !== 0) {
      handler.changeSorting(index, 0);
    }
  }
}

function updateDimensionId(dimension, data /* , handler */) {
  setValue(data, 'color.dimensionId', undefined);
}

export default function dataDefinition({ translator }) {
  return {
    dimensions: {
      min: 1,
      max: 15,
      description(properties, index) {
        const dimensionCount = properties.qHyperCubeDef.qDimensions.length;
        const translationProperty =
          index >= dimensionCount - 1 ? 'Visualizations.Descriptions.Rectangle' : 'Visualizations.Descriptions.Group';

        return translator.get(translationProperty);
      },
      add(dimension, data, handler) {
        setColorVars(data, handler);
      },
      move(dimension, data, handler) {
        setMoveSort(handler);
        setColorVars(data, handler);
      },
      remove(dimension, data, handler) {
        updateDimensionId(dimension, data, handler);
        setColorVars(data, handler);
      },
      replace(dimension, oldDimension, index, data) {
        if (getValue(data, 'color.dimensionId') === oldDimension.qDef.cId) {
          setValue(data, 'color.dimensionId', dimension.qDef.cId);
        }
      },
    },
    measures: {
      min: 1,
      max: 1,
      description(properties, index) {
        const translationProperty =
          index === 0 ? 'Visualizations.Descriptions.Size' : 'Visualizations.Descriptions.Color';
        return translator.get(translationProperty);
      },
      add(dimension, data, handler) {
        setColorVars(data, handler);
      },
      move(dimension, data, handler) {
        setColorVars(data, handler);
      },
      remove(dimension, data, handler) {
        setColorVars(data, handler);
      },
    },
  };
}
