/* eslint-disable no-underscore-dangle */
export default (chart, key) => {
  const legend = chart.component(key);
  return legend && legend._DO_NOT_USE_getInfo && legend._DO_NOT_USE_getInfo().offset;
};
