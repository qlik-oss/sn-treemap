export const active = () => ({
  stroke: 'black',
  strokeWidth: (d) => (d.data.child ? 0 : 2),
  opacity: (d) => (d?.data?.overlay ? 0.7 : 1),
});

export const inactive = () => ({
  opacity: (d) => (d?.data?.parentGroup ? 0 : 0.5),
});
