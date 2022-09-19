const TREEMAP_LABEL_FONTSIZE = 12;
const TREEMAP_VALUE_FONTSIZE = 12;
const TREEMAP_MESSAGE_SIZE = 16;
import { truncate, cram } from "./text-helper";

const fontFamily = "System";

export const createTextLabels = ({
  node,
  width,
  height,
  fill,
  valueLables,
  labels,
  formatter,
  getContrastingColorTo,
  renderer,
}) => {
  const area = width * height;
  if (area && node?.data?.label) {
    if (node.header) {
      return headerText({
        node,
        width,
        height,
        fill,
        getContrastingColorTo,
        renderer,
        valueLables,
        labels,
      });
    }
    let wantedText = node.data.label;
    if (labels.value) {
      wantedText += `\n${formatter[0].formatValue(node.data.value)}`;
    }
    const texts = wantedText.split(/(\s+)/).filter((s) => s !== ' ');
    // find maxLength
    const maxChars = texts.reduce((prev, current) => {
      return prev.length > current.length ? prev : current;
    });

    let textSize = renderer.measureText({
      text: maxChars,
      fontSize: TREEMAP_VALUE_FONTSIZE,
      fontFamily,
    });

    const verticalPadding = 12;
    if (textSize.width < width - verticalPadding) {
      let top = node.y0 + 4;
      // now calc maxheight
      if (labels.value) {
        texts.push(formatter[0].formatValue(node.data.value));
      }
      const maxheight = texts.reduce(
        (acc, cur) =>
          acc +
          renderer.measureText({
            text: cur,
            fontSize: TREEMAP_VALUE_FONTSIZE,
            fontFamily,
          }).height,
        0,
      );
      if (maxheight < height - 8) {
        let y = top;
        let text = `${node.data.label}`;
        let leafValue = '';
          leafValue = formatter[0].formatValue(node.data.value);
          const valueSize = renderer.measureText({
            text: leafValue,
            fontSize: TREEMAP_VALUE_FONTSIZE,
            fontFamily,
          });

        text = cram(text, {width: width - 8, height}, (val) => renderer.measureText({text: val, fontFamily,fontSize: TREEMAP_VALUE_FONTSIZE, }), renderer, TREEMAP_VALUE_FONTSIZE, fontFamily);
        if (valueSize.width < width - verticalPadding && valueSize.height + maxheight < height - 8) {
          text += `\n${leafValue}`;
        }
        valueLables.push({
          type: 'text',
          text,
          fontFamily,
          fontSize: TREEMAP_VALUE_FONTSIZE,
          x: node.x0 + TREEMAP_VALUE_FONTSIZE / 2,
          y,
          fill: fill ? getContrastingColorTo(fill) : 'rgb(0, 0, 0)',
          baseline: 'text-before-edge',
          maxWidth: width - verticalPadding,
          wordBreak: 'break-word',
          data: {...node.data, depth: node.depth},
        });
      }
    }
  }
};

const headerText = ({
  node,
  width,
  fill,
  valueLables,
  getContrastingColorTo,
  renderer,
}) => {
  const verticalPadding = 12;
  let text = node.data.label;
  let textSize = renderer.measureText({
    text,
    fontSize: TREEMAP_LABEL_FONTSIZE,
    fontFamily,
  });
  let top = node.y0 + textSize.height;
  if (node.header && !node.showLable) {
    return;
  }
  if(textSize.width > width - 8) {
    text = truncate(text, width - 10, renderer, TREEMAP_LABEL_FONTSIZE, fontFamily);
  }
  valueLables.push({
    type: 'text',
    text,
    fontFamily,
    fontSize: TREEMAP_LABEL_FONTSIZE,
    x: node.x0 + TREEMAP_LABEL_FONTSIZE / 2,
    y: top + TREEMAP_LABEL_FONTSIZE / 2,
    fill: fill ? getContrastingColorTo(fill) : 'rgb(0, 0, 0)',
    anchor: 'left',
    baseline: 'centeral',
    maxWidth: width - verticalPadding,
    data: {...node.data, depth: node.depth},
  });
};

export const displayInvalidMessage = ({rect, text, renderer}) => {
  let textSize = renderer.measureText({
    text,
    fontSize: TREEMAP_MESSAGE_SIZE,
    fontFamily,
  });

  return [
    {
      type: 'rect',
      x: 0,
      y: 0,
      width: rect.width,
      height: rect.height,
      fill: 'red',
      opacity: 0.1,
    },
    {
      type: 'text',
      text,
      fontFamily,
      fontSize: TREEMAP_MESSAGE_SIZE,
      x: (rect.width - textSize.width) / 2,
      y: (rect.height - textSize.height) / 2,
      fill: 'red',
      baseline: 'text-before-edge',
      maxWidth: rect.width - 8,
      wordBreak: 'break-word',
    },
  ];
};

export const createOverlayLabel = ({node, avgColor, width, height, renderer, getContrastingColorTo}) => {
  let text = node.data.label;
  let textSize = renderer.measureText({
    text,
    fontSize: 24,
    fontFamily,
  });

  const x = node.x0 + (width - textSize.width) / 2;
  const y = node.y0 + 18 + (height - textSize.height) / 2;

  if(textSize.width > width - 8) {
    text = truncate(text, width - 10, renderer, TREEMAP_LABEL_FONTSIZE, fontFamily);
  }

  textSize = renderer.measureText({
    text,
    fontSize: 24,
    fontFamily,
  });

  const fitWidth = width - 8;
  if(textSize.width < fitWidth && textSize.height < height) {

    return {
      type: 'text',
      text,
      fontFamily,
      fontSize: 24,
      x,
      y,
      fill: getContrastingColorTo(avgColor),
      baseline: 'center',
      opacity: 0.7,
      data: {...node.data, depth: node.depth},
    }
  }
  return undefined;
}
