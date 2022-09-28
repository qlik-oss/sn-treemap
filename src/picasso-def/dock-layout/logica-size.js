export function logicalSize(layout, options) {
  if (layout.snapshotData && !options.freeResize) {
    return {
      align: 0.5,
      preserveAspectRatio: true,
      width: layout.snapshotData.content.size.w,
      height: layout.snapshotData.content.size.h,
    };
  }
  return undefined;
}
