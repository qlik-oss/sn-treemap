import { getNextSelectLevel, getAutoColorLevel } from '../getLevel';

const toHyperCube = (qDimensionInfo) => ({ qHyperCube: { qDimensionInfo } });

const lockedDims = toHyperCube([
  {
    qCardinal: 3,
    qLocked: true,
    qStateCounts: {
      qLocked: 3,
      qSelected: 0,
      qOption: 0,
      qDeselected: 0,
      qAlternative: 0,
      qExcluded: 0,
      qSelectedExcluded: 0,
      qLockedExcluded: 0,
    },
    qCardinalities: {
      qCardinal: 3,
      qHypercubeCardinal: 3,
      qAllValuesCardinal: -1,
    },
  },
  {
    qCardinal: 3,
    qLocked: true,
    qStateCounts: {
      qLocked: 3,
      qSelected: 0,
      qOption: 0,
      qDeselected: 0,
      qAlternative: 0,
      qExcluded: 0,
      qSelectedExcluded: 0,
      qLockedExcluded: 0,
    },
    qCardinalities: {
      qCardinal: 3,
      qHypercubeCardinal: 4,
      qAllValuesCardinal: -1,
    },
  },
  {
    qCardinal: 3,
    qLocked: true,
    qStateCounts: {
      qLocked: 3,
      qSelected: 0,
      qOption: 0,
      qDeselected: 0,
      qAlternative: 0,
      qExcluded: 0,
      qSelectedExcluded: 0,
      qLockedExcluded: 0,
    },
    qCardinalities: {
      qCardinal: 3,
      qHypercubeCardinal: 5,
      qAllValuesCardinal: -1,
    },
  },
  {
    qCardinal: 3,
    qStateCounts: {
      qLocked: 0,
      qSelected: 0,
      qOption: 3,
      qDeselected: 0,
      qAlternative: 0,
      qExcluded: 0,
      qSelectedExcluded: 0,
      qLockedExcluded: 0,
    },
    qCardinalities: {
      qCardinal: 3,
      qHypercubeCardinal: 5,
      qAllValuesCardinal: -1,
    },
  },
  {
    qCardinal: 3,
    qStateCounts: {
      qLocked: 0,
      qSelected: 0,
      qOption: 3,
      qDeselected: 0,
      qAlternative: 0,
      qExcluded: 0,
      qSelectedExcluded: 0,
      qLockedExcluded: 0,
    },
    qCardinalities: {
      qCardinal: 3,
      qHypercubeCardinal: 5,
      qAllValuesCardinal: -1,
    },
  },
]);

const pseudoDimNoSelection = toHyperCube([
  {
    qCardinal: 2,
    qStateCounts: {
      qLocked: 0,
      qSelected: 0,
      qOption: 0,
      qDeselected: 0,
      qAlternative: 0,
      qExcluded: 0,
      qSelectedExcluded: 0,
      qLockedExcluded: 0,
    },
    qCardinalities: {
      qCardinal: 2,
      qHypercubeCardinal: 2,
      qAllValuesCardinal: -1,
    },
  },
  {
    qCardinal: 6,
    qStateCounts: {
      qLocked: 0,
      qSelected: 0,
      qOption: 6,
      qDeselected: 0,
      qAlternative: 0,
      qExcluded: 0,
      qSelectedExcluded: 0,
      qLockedExcluded: 0,
    },
    qCardinalities: {
      qCardinal: 6,
      qHypercubeCardinal: 7,
      qAllValuesCardinal: -1,
    },
  },
  {
    qCardinal: 3,
    qStateCounts: {
      qLocked: 0,
      qSelected: 0,
      qOption: 3,
      qDeselected: 0,
      qAlternative: 0,
      qExcluded: 0,
      qSelectedExcluded: 0,
      qLockedExcluded: 0,
    },
    qCardinalities: {
      qCardinal: 3,
      qHypercubeCardinal: 5,
      qAllValuesCardinal: -1,
    },
  },
]);

const pseudoDimWithSelection = toHyperCube([
  {
    qCardinal: 2,
    qStateCounts: {
      qLocked: 0,
      qSelected: 0,
      qOption: 0,
      qDeselected: 0,
      qAlternative: 0,
      qExcluded: 0,
      qSelectedExcluded: 0,
      qLockedExcluded: 0,
    },
    qCardinalities: {
      qCardinal: 2,
      qHypercubeCardinal: 2,
      qAllValuesCardinal: -1,
    },
  },
  {
    qCardinal: 6,
    qStateCounts: {
      qLocked: 0,
      qSelected: 1,
      qOption: 0,
      qDeselected: 0,
      qAlternative: 5,
      qExcluded: 0,
      qSelectedExcluded: 0,
      qLockedExcluded: 0,
    },
    qCardinalities: {
      qCardinal: 6,
      qHypercubeCardinal: 2,
      qAllValuesCardinal: -1,
    },
  },
  {
    qCardinal: 3,
    qStateCounts: {
      qLocked: 0,
      qSelected: 0,
      qOption: 3,
      qDeselected: 0,
      qAlternative: 0,
      qExcluded: 0,
      qSelectedExcluded: 0,
      qLockedExcluded: 0,
    },
    qCardinalities: {
      qCardinal: 3,
      qHypercubeCardinal: 5,
      qAllValuesCardinal: -1,
    },
  },
]);

const pseudoDimOnly = toHyperCube([
  {
    qCardinal: 2,
    qStateCounts: {
      qLocked: 0,
      qSelected: 0,
      qOption: 0,
      qDeselected: 0,
      qAlternative: 0,
      qExcluded: 0,
      qSelectedExcluded: 0,
      qLockedExcluded: 0,
    },
    qCardinalities: {
      qCardinal: 2,
      qHypercubeCardinal: 2,
      qAllValuesCardinal: -1,
    },
  },
  {
    qCardinal: 2,
    qStateCounts: {
      qLocked: 0,
      qSelected: 0,
      qOption: 0,
      qDeselected: 0,
      qAlternative: 0,
      qExcluded: 0,
      qSelectedExcluded: 0,
      qLockedExcluded: 0,
    },
    qCardinalities: {
      qCardinal: 2,
      qHypercubeCardinal: 3,
      qAllValuesCardinal: -1,
    },
  },
]);

const unselectedDimWithOnlyOneValue = toHyperCube([
  {
    qCardinal: 6,
    qStateCounts: {
      qLocked: 0,
      qSelected: 1,
      qOption: 0,
      qDeselected: 0,
      qAlternative: 5,
      qExcluded: 0,
      qSelectedExcluded: 0,
      qLockedExcluded: 0,
    },
    qCardinalities: {
      qCardinal: 6,
      qHypercubeCardinal: 1,
      qAllValuesCardinal: -1,
    },
  },
  {
    qCardinal: 3,
    qStateCounts: {
      qLocked: 0,
      qSelected: 0,
      qOption: 1,
      qDeselected: 0,
      qAlternative: 0,
      qExcluded: 2,
      qSelectedExcluded: 0,
      qLockedExcluded: 0,
    },
    qCardinalities: {
      qCardinal: 3,
      qHypercubeCardinal: 2,
      qAllValuesCardinal: -1,
    },
  },
  {
    qStateCounts: {
      qLocked: 0,
      qSelected: 0,
      qOption: 3,
      qDeselected: 0,
      qAlternative: 0,
      qExcluded: 0,
      qSelectedExcluded: 0,
      qLockedExcluded: 0,
    },
    qCardinalities: {
      qCardinal: 3,
      qHypercubeCardinal: 5,
      qAllValuesCardinal: -1,
    },
  },
]);

const oneNoramlAndNull = toHyperCube([
  {
    qCardinal: 2,
    qStateCounts: {
      qLocked: 0,
      qSelected: 1,
      qOption: 0,
      qDeselected: 0,
      qAlternative: 1,
      qExcluded: 0,
      qSelectedExcluded: 0,
      qLockedExcluded: 0,
    },
    qCardinalities: {
      qCardinal: 2,
      qHypercubeCardinal: 1,
      qAllValuesCardinal: -1,
    },
  },
  {
    qCardinal: 5,
    qStateCounts: {
      qLocked: 0,
      qSelected: 0,
      qOption: 1,
      qDeselected: 0,
      qAlternative: 0,
      qExcluded: 4,
      qSelectedExcluded: 0,
      qLockedExcluded: 0,
    },
    qCardinalities: {
      qCardinal: 5,
      qHypercubeCardinal: 3,
      qAllValuesCardinal: -1,
    },
  },
  {
    qCardinal: 3,
    qStateCounts: {
      qLocked: 0,
      qSelected: 0,
      qOption: 3,
      qDeselected: 0,
      qAlternative: 0,
      qExcluded: 0,
      qSelectedExcluded: 0,
      qLockedExcluded: 0,
    },
    qCardinalities: {
      qCardinal: 3,
      qHypercubeCardinal: 5,
      qAllValuesCardinal: -1,
    },
  },
]);

describe('getNextSelectLevel', () => {
  it('skip locked dims', () => {
    const selectLevel = getNextSelectLevel(lockedDims);
    expect(selectLevel).toEqual(3);
  });

  it('skip pseudo dim', () => {
    const selectLevel = getNextSelectLevel(pseudoDimNoSelection);
    expect(selectLevel).toEqual(1);
  });

  it('skip pseudo dim and dim with selection', () => {
    const selectLevel = getNextSelectLevel(pseudoDimWithSelection);
    expect(selectLevel).toEqual(2);
  });

  it('select on unselected dim with only one value', () => {
    const selectLevel = getNextSelectLevel(unselectedDimWithOnlyOneValue);
    expect(selectLevel).toEqual(1);
  });

  it('no selection in pseudoDimOnly', () => {
    const selectLevel = getNextSelectLevel(pseudoDimOnly);
    expect(selectLevel).toEqual(-1);
  });

  it('select on only null and a single other value', () => {
    const selectLevel = getNextSelectLevel(oneNoramlAndNull);
    expect(selectLevel).toEqual(1);
  });
});

describe('getNextSelectLevel', () => {
  it('color locked dims', () => {
    const selectLevel = getAutoColorLevel(lockedDims);
    expect(selectLevel).toEqual(0);
  });

  it('color pseudo dim', () => {
    const selectLevel = getAutoColorLevel(pseudoDimNoSelection);
    expect(selectLevel).toEqual(0);
  });

  it('skip unselected dim with only one value', () => {
    const selectLevel = getAutoColorLevel(unselectedDimWithOnlyOneValue);
    expect(selectLevel).toEqual(2);
  });

  it('color if only null and a single other value', () => {
    const selectLevel = getAutoColorLevel(oneNoramlAndNull);
    expect(selectLevel).toEqual(1);
  });
});
