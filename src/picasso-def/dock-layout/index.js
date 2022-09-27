import { LAYOUT_MODES } from './layout-modes';
import { logicalSize } from './logica-size';

export function dockLayout(layout, options) {
  return {
    layoutModes: LAYOUT_MODES,
    center: {
      minWidthRatio: 0,
      minHeightRatio: 0,
    },
    logicalSize: logicalSize(layout, options),
  };
}
