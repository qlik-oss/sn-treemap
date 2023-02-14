import { LAYOUT_MODES } from '../dock-layout/layout-modes';

const isSmallLayoutMode = (width, height) => width <= LAYOUT_MODES.SMALL.width || height <= LAYOUT_MODES.SMALL.height;

const getLabelSettings = (component) => {
  const { auto, values } = component.settings.settings.labels;
  let { headers, overlay, leaves } = component.settings.settings.labels;
  if (auto) {
    headers = true;
    overlay = true;
    leaves = true;
  }
  const boundingRect = component.rect;
  const smallLayoutMode = isSmallLayoutMode(boundingRect.width, boundingRect.height);
  if (smallLayoutMode) {
    headers = false;
  }
  return {
    headers,
    overlay,
    leaves,
    values,
  };
};

export default getLabelSettings;
