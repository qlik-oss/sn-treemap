const byGradient = ({ layout, theme }) => {
  let dataColors = theme.getDataColorScales().find((dataColor) => dataColor.key === layout.color.measureScheme);
  if (!dataColors) {
    dataColors = theme.getDataColorScales()[0];
  }
  const isArray = dataColors.colors.some((a) => Array.isArray(a));
  const { color, qHyperCube } = layout;

  let range = [...dataColors.colors].reverse();
  if (isArray) {
    const index = Math.min(qHyperCube.qDimensionInfo.length, dataColors.colors.length);
    range = [...dataColors.colors[index]].reverse();
  }
  if (qHyperCube.qSize.qcy === qHyperCube.qDimensionInfo.length) {
    // if at the bottom of the tree use mid point when using byMeasure
    // if diverging gradient use middle point else use zero value
    if (color.measureScheme === 'dg') {
      const mid = range[Math.floor(range.length / 2)];
      range = [mid];
    } else {
      range = [range[0]];
    }
  }

  return range;
};

const byClasses = ({ layout, theme }) => {
  const dataColors = theme.getDataColorScales().find((dataColor) => dataColor.key === layout.color.measureScheme);

  if (layout.color.mode === 'byMeasure') {
    const index = dataColors.colors.length - 1;
    return [...dataColors.colors[index]].reverse();
  }

  const { qHyperCube } = layout;
  const index = Math.min(dataColors.colors.length - 1, qHyperCube.qDimensionInfo.length);
  let range = [...dataColors.colors[index]].reverse();
  if (qHyperCube.qSize.qcy === qHyperCube.qDimensionInfo.length) {
    if (layout.color.measureScheme === 'dc') {
      const mid = range[Math.floor(range.length / 2)];
      range = [mid];
    } else {
      range = [...dataColors.colors[1]];
    }
  }
  if (layout.color.mode === 'byExpression') {
    if (layout.color.measureScheme === 'dc') {
      // eslint-disable-next-line no-shadow
      const index = Math.min(qHyperCube.qMeasureInfo[0].qAttrExprInfo[0].qMax + 1, dataColors.colors.length - 1);
      return [...dataColors.colors[index]].reverse();
    }
    range = [...dataColors.colors[layout.color.paletteColor?.index - 1 || 0]].reverse();
  }
  return range;
};

const byMeasure = ({ layout, theme }) => {
  if (layout.color.measureScheme === 'sc' || layout.color.measureScheme === 'dc') {
    return byClasses({ layout, theme });
  }
  return byGradient({ layout, theme });
};

const updateSelectionsDims = ({ color, qDimensionInfo, level }) => {
  //  init defaults
  let dimIndex = color.auto ? 0 : color.byDimDef.activeDimensionIndex || 0;
  let field = `qDimensionInfo/${dimIndex}`;

  if (color.byDimDef) {
    dimIndex = qDimensionInfo.length > 1 ? qDimensionInfo.length - 1 : 0;
    if (color.byDimDef.type === 'expression' && qDimensionInfo[dimIndex].qAttrDimInfo.length > 0) {
      field = `qDimensionInfo/${dimIndex}/qAttrDimInfo/0`;
      return { dimIndex, field };
    }
  }

  // now adjust according to level of selections
  if (color.auto) {
    dimIndex = level;
  } else {
    dimIndex = level === qDimensionInfo.length ? level : dimIndex;
  }
  field = `qDimensionInfo/${dimIndex}`;
  return { dimIndex, field };
};

const byDimension = ({ layout, theme, level }) => {
  const { qDimensionInfo } = layout.qHyperCube;
  const { color } = layout;
  let colors = [...theme.getDataColorPalettes()[0].colors];
  const pal = theme.getDataColorPalettes().find((c) => c.key === layout.color.dimensionScheme);

  if (pal !== undefined) {
    colors = pal.colors;
  }

  const { dimIndex, field } = updateSelectionsDims({ color, qDimensionInfo, level });
  let dimColorLen = qDimensionInfo[dimIndex].qCardinal;
  if (layout.color.byDimDef) {
    if (qDimensionInfo[dimIndex]?.qAttrDimInfo[0]?.qCardinal) {
      dimColorLen = qDimensionInfo[dimIndex].qAttrDimInfo[0].qCardinal;
    }
  }

  const index =
    qDimensionInfo.length === 1 && !layout.color.byDimDef ? 0 : Math.min(dimColorLen - 1, colors.length - 1);

  const range = layout.color.dimensionScheme === '12' ? colors[index] : colors;
  return { range, field };
};

const byPrimary = ({ layout, theme }) => {
  const { color } = layout;
  if (color.paletteColor.color) {
    return [color.paletteColor.color];
  }
  const specials = theme.getDataColorSpecials();
  return [specials?.primary || 'grey'];
};

export const colorScale = ({ layout, theme, level }) => {
  if (layout.qHyperCube.qDimensionInfo.length === 0 || layout.qHyperCube.qMeasureInfo.length === 0) {
    return {
      color: {
        range,
        type,
      },
      field,
    };
  }

  const { color } = layout;
  let range;
  let field = 'qDimensionInfo/0';
  let type = 'color';
  if (color.auto || color.mode === 'byDimension') {
    const dimensionColor = byDimension({ layout, theme, level });
    range = dimensionColor.range;
    field = dimensionColor.field;
    type = 'categorical-color';
  } else if (color.mode === 'byMeasure' || color.mode === 'byExpression') {
    range = byMeasure({ layout, theme });
    field = 'qMeasureInfo/0';
  } else if (color.mode === 'primary') {
    field = 'qMeasureInfo/0';
    range = byPrimary({ layout, theme });
  }

  if (color.reverseScheme) {
    range.reverse();
  }

  return {
    color: {
      data: { extract: { field } },
      range,
      type,
    },
    field,
  };
};
