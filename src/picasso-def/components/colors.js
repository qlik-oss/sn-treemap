import { hsl } from 'd3-color';

export const toColor = (num) => {
  num >>>= 0;
  const b = num & 0xff;
  const g = (num & 0xff00) >>> 8;
  const r = (num & 0xff0000) >>> 16;
  const a = ((num & 0xff000000) >>> 24) / 255;
  return 'rgba(' + [r, g, b, a].join(',') + ')';
};

export const incrementColor = (node, fill) => {
  const sumColor = hsl(fill);
  if (sumColor) {
    const parent = node.depth === 4 ? node.parent.parent : node.parent;
    const parentSumColor = parent?.sumColor || {
      h: 0,
      s: 0,
      l: 0,
      count: 0,
    };
    parentSumColor.h += sumColor.h * sumColor.h;
    parentSumColor.s += sumColor.s * sumColor.s;
    parentSumColor.l += sumColor.l * sumColor.l;
    parentSumColor.count += 1;
    parent.sumColor = parentSumColor;
  }
};

export const getAverageContrastedColor = (node) => {
  const { sumColor } = node;
  if (sumColor) {
    const average = {
      h: Math.round(Math.sqrt(sumColor.h / sumColor.count)),
      s: Math.round(Math.sqrt(sumColor.s / sumColor.count)),
      l: Math.round(Math.sqrt(sumColor.l / sumColor.count)),
    };
    const rgbAvg = hsl(`rgb(${average.h}, ${average.s}%, ${average.l}%)`).rgb();
    rgbAvg.opacity = 0.7;
    return rgbAvg.toString();
  }
  return 'rgba(0, 0, 0, 0.7)';
};

export const getNodeColor = (node, colorScale, headerColor, colorSettings, colorIndex) => {
  if (node.header && !isNaN(node.value)) {
    return headerColor;
  }
  if (node.data.expressionColor !== undefined && colorSettings.mode === 'byExpression') {
    if (colorSettings.measureScheme === 'dc') {
      const range = colorScale.range();
      const colorValue = node.data.expressionColor.value.qSubNodes[0].qAttrExps.qValues[0].qNum;
      const index = Math.trunc(colorValue % range.length);
      if (range) {
        return range[index];
      }
      return '#000000';
    }
    const exp = node.data.expressionColor.value;
    if (!isNaN(exp)) {
      return toColor(exp);
    } else if (node.data.expressionColorText !== undefined) {
      const hextString = `#${node.data.expressionColorText.value.toString(16)}`;
      return hextString;
    }
  }

  if (node.data?.expressionColor?.label?.qType === 'O') {
    return colorSettings.others;
  }

  if (
    colorScale.type === 'categorical-color' ||
    (colorSettings.measureScheme === 'dc' && colorSettings.mode !== 'byMeasure')
  ) {
    const range = colorScale.range();
    let colorValue = colorSettings.persistent ? node.data.color.value : colorIndex;
    if (colorValue < 0) {
      colorValue = node.data.select.value;
    }
    const index = colorValue % range.length;
    return range[index];
  }

  return colorScale(node.data.color.value);
};
