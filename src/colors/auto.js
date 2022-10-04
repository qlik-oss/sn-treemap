import { getLevel, getNextSelecteDim } from '../picasso-def/getLevel';

export function auto({ defaultAuto, layout }) {
  if (layout.qHyperCube.qDimensionInfo.length <= 1) {
    return defaultAuto(layout);
  }

  const level = getLevel(layout);
  const dimLevel = getNextSelecteDim(layout);
  const selectLevel = Math.min(level, dimLevel);

  return {
    mode: 'byDimension',
    persistent: false,
    useDimColVal: true,
    byDimDef: {
      activeDimensionIndex: selectLevel,
    },
  };
}
