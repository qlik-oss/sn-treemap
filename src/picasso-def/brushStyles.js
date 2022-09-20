const HIGHLIGHT_STROKE_WIDTH = 2;
export const active = () => ({
  stroke: 'black',
  strokeWidth: (d) => {
 
 
  const {select} = d.data;
  const {source} = d.data;
  return source?.field === select?.source?.field ? HIGHLIGHT_STROKE_WIDTH : 0;
  },
  opacity: (d) => d?.data?.overlayLabel || d?.data?.parentGroup ? 0 : 1,
});

export const inactive = () => ({
  opacity: (d) => (d?.data?.parentGroup ? 0 : 0.5),
});
