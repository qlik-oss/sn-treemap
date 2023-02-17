import { getAutoColorLevel } from '../picasso-def/getLevel';

export function auto({ defaultAuto, layout }) {
  if (layout.qHyperCube.qDimensionInfo.length <= 1) {
    return defaultAuto(layout);
  }

  const colorLevel = getAutoColorLevel(layout);

  return {
    mode: 'byDimension',
    persistent: false,
    useDimColVal: true,
    byDimDef: {
      activeDimensionIndex: colorLevel,
    },
  };
}
