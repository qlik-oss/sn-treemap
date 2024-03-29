const isSelectableDim = (info, index) => {
  if (info.qLocked) {
    return false;
  }
  if (info.qStateCounts.qSelected > 1) {
    return true;
  }
  if (info.qStateCounts.qOption > 0) {
    return true;
  }
  if (info.qStateCounts.qSelected === 1 && info.qStateCounts.qAlternative > 0) {
    return info.qCardinalities.qHypercubeCardinal > 1 + index; // + index is for total nodes
  }
  return false;
};

export const getNextSelectLevel = ({ qHyperCube }) => {
  // find the first dimension that is selectable:
  // - the dimension must not be a pseudo dimension
  // - the dimension must not be locked
  // - if the dimension has been selected in, there must be other nodes to select in that same dimension

  const { qDimensionInfo } = qHyperCube;
  return qDimensionInfo.findIndex(isSelectableDim);
};

const colorOnDim = (info, index) => {
  if (info.qCardinalities?.qCardinal !== info.qCardinal) {
    // old snapshot
    const { qLocked, qSelected } = info.qStateCounts;
    return qLocked + qSelected !== 1;
  }
  return info.qCardinalities.qHypercubeCardinal > 1 + index; // + index is for total nodes
};

export const getAutoColorLevel = ({ qHyperCube }) => {
  const { qDimensionInfo } = qHyperCube;
  const dim = qDimensionInfo.findIndex(colorOnDim);
  return dim === -1 ? qDimensionInfo.length - 1 : dim;
};
