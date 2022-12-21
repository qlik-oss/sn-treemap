import customTooltipNodes from '../custom-tooltip/picasso-definitions/nodes';

const NOT_FETCHED_ELEM_NO = -11;
const hasValidType = ({ qType }) => qType === 'N' || qType === 'O' || qType === 'U';

export const getTreeDataCollection = ({ colorService, layout, selectLevel }) => {
  const dimensionCount = layout.qHyperCube.qDimensionInfo.length;
  return {
    key: 'hierarchy',
    data: {
      hierarchy: {
        label(datum) {
          return datum?.qText ? datum.qText : '';
        },
        value(datum) {
          return datum.qElemNo;
        },
        children(parentNode) {
          const children = parentNode.qSubNodes.filter(hasValidType);
          if (parentNode.qDown > 0) {
            let missingValue = parentNode.qMaxPos;
            children.forEach((childNode) => {
              missingValue -= childNode.qMaxPos;
            });
            children.push({
              qType: 'Fake',
              qElemNo: NOT_FETCHED_ELEM_NO,
              qMaxPos: missingValue,
              qSubNodes: [],
            });
          }
          return children;
        },
        props: {
          size: {
            value: (d, node) => {
              const validType = hasValidType(node.data);
              if (validType && node.data.qSubNodes?.length === 1 && node.data.qSubNodes[0]?.qType === 'V') {
                return node.data.qMaxPos;
              }
              if (node.data.qType === 'Fake') {
                return node.data.qMaxPos;
              }
              return 0;
            },
          },
          select: {
            field: `qDimensionInfo/${selectLevel}`,
            reduce: (values) => (values.length === 1 ? values[0] : undefined),
          },
          isNull: { value: (d, node) => node.data.qElemNo === -2 },
          ...colorService.getDatumProps(),
          isOther: { value: (d, node) => node.data.qElemNo === -3 || node.data.qElemNo === NOT_FETCHED_ELEM_NO },
          isNotFetchedOthers: { value: (d, node) => node.data.qElemNo === NOT_FETCHED_ELEM_NO },
          customTooltipAttrExps:
            dimensionCount !== 0 ? customTooltipNodes.getNode(layout, { dimensionCount }) : undefined,
        },
      },
    },
  };
};
