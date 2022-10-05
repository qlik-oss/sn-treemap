import { color as d3Color } from 'd3-color';

export const incrementColor = (node, fill) => {
  const sumColor = d3Color(fill);
  if (sumColor) {
    const parent = node.depth === 4 ? node.parent.parent : node.parent;
    const parentSumColor = parent?.sumColor || {
      r: 0,
      g: 0,
      b: 0,
      count: 0,
    };
    parentSumColor.r += sumColor.r;
    parentSumColor.g += sumColor.g;
    parentSumColor.b += sumColor.b;
    parentSumColor.count += 1;
    parent.sumColor = parentSumColor;
  }
};

export const getAverageColor = (node) => {
  const { sumColor } = node;
  if (sumColor) {
    const average = {
      r: Math.round(sumColor.r / sumColor.count),
      g: Math.round(sumColor.g / sumColor.count),
      b: Math.round(sumColor.b / sumColor.count),
    };
    const ar = `rgb(${average.r}, ${average.g}, ${average.b})`;
    return ar;
  }
  return 'rgb(0, 0, 0)';
};
