/* eslint no-param-reassign:0 */

export default (layout, element) => {
  const rect = element.getBoundingClientRect();

  layout.snapshotData = layout.snapshotData || {};

  layout.snapshotData.content = layout.snapshotData.content || {};
  layout.snapshotData.content.size = layout.snapshotData.content.size || {
    w: rect.width,
    h: rect.height,
  };
};
