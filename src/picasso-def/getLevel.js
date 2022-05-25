export const getLevel = ({qHyperCube}) => {
  const {qDimensionInfo} = qHyperCube;
  let level = qDimensionInfo.reduce((acc, curr, index) => {
    if (qDimensionInfo[index].qStateCounts.qSelected === 1) {
      return acc + 1;
    }
    return acc;
  }, 0);
  level = Math.min(level, qDimensionInfo.length - 1);
  return level;
};

export const getNextSelecteDim = ({qHyperCube}) => {
  // find first dim without a selection
  const {qDimensionInfo} = qHyperCube;
  const dim = qDimensionInfo.findIndex(
    (info) => info.qStateCounts.qSelected === 0,
  );
  return dim === -1 ? qDimensionInfo.length - 1 : dim;
};
