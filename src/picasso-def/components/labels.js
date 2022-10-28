import { truncate, cram } from './text-helper';

const TREEMAP_LABEL_FONTSIZE = 14;
const TREEMAP_VALUE_FONTSIZE = 12;
const TREEMAP_MESSAGE_SIZE = 16;

const fontFamily = 'Source Sans Pro';

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
      headerText({
        node,
        width,
        height,
        fill,
        getContrastingColorTo,
        renderer,
        valueLables,
        labels,
      });
      return;
    }
    let wantedText = node.data.label;
    if (labels.value) {
      wantedText += `\n${formatter[0].formatValue(node.data.value)}`;
    }
    const texts = wantedText.split(/(\s+)/).filter((s) => s !== ' ');
    // find maxLength
    const maxChars = texts.reduce((prev, current) => (prev.length > current.length ? prev : current));

    const textSize = renderer.measureText({
      text: maxChars,
      fontSize: TREEMAP_VALUE_FONTSIZE,
      fontFamily,
    });

    const verticalPadding = 12;
    if (textSize.width < width - verticalPadding) {
      const top = node.y0 + 4;
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
        0
      );
      if (maxheight < height - 8) {
        const y = top;
        let text = `${node.data.label}`;
        let leafValue = '';
        leafValue = formatter[0].formatValue(node.data.value);
        const valueSize = renderer.measureText({
          text: leafValue,
          fontSize: TREEMAP_VALUE_FONTSIZE,
          fontFamily,
        });

        text = cram(
          text,
          { width: width - 8, height },
          (val) => renderer.measureText({ text: val, fontFamily, fontSize: TREEMAP_VALUE_FONTSIZE }),
          renderer,
          TREEMAP_VALUE_FONTSIZE,
          fontFamily
        );
        if (labels.values) {
          if (valueSize.width < width && valueSize.height + maxheight < height - 8) {
            text += `\n${leafValue}`;
          }
        }
        valueLables.push({
          type: 'text',
          text,
          fontFamily,
          fontSize: TREEMAP_VALUE_FONTSIZE + 'px',
          fontWeight: 'normal',
          x: node.x0 + TREEMAP_VALUE_FONTSIZE / 2,
          y,
          fill: fill ? getContrastingColorTo(fill) : 'rgb(0, 0, 0)',
          baseline: 'text-before-edge',
          wordBreak: 'break-word',
          data: { ...node.data, depth: node.depth },
        });
      }
    }
  }
};

const headerText = ({ node, width, fill, valueLables, getContrastingColorTo, renderer }) => {
  const verticalPadding = 12;
  let text = node.data.label;
  const textSize = renderer.measureText({
    text,
    fontSize: TREEMAP_LABEL_FONTSIZE,
    fontFamily,
  });
  const top = node.y0 + 4;
  if (node.header && !node.showLable) {
    return;
  }
  if (textSize.width > width - 8) {
    text = truncate(text, width - 10, renderer, TREEMAP_LABEL_FONTSIZE, fontFamily);
  }
  valueLables.push({
    type: 'text',
    text,
    fontFamily,
    fontSize: TREEMAP_LABEL_FONTSIZE + 'px',
    fontWeight: 'normal',
    x: node.x0 + TREEMAP_LABEL_FONTSIZE / 2,
    y: top + TREEMAP_LABEL_FONTSIZE / 2,
    fill: fill ? getContrastingColorTo(fill) : 'rgb(0, 0, 0)',
    anchor: 'left',
    baseline: 'central',
    maxWidth: width - verticalPadding,
    data: { ...node.data, depth: node.depth },
  });
};

export const displayInvalidMessage = ({ rect, text, renderer }) => {
  const textSize = renderer.measureText({
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
      fontSize: TREEMAP_MESSAGE_SIZE + 'px',
      fontWeight: 'normal',
      x: (rect.width - textSize.width) / 2,
      y: (rect.height - textSize.height) / 2,
      fill: 'red',
      baseline: 'text-before-edge',
      maxWidth: rect.width - 8,
      wordBreak: 'break-word',
    },
  ];
};

export const createOverlayLabel = ({ node, avgColor, width, height, getContrastingColorTo }) => {
  const text = node.data.label;
  const optimal = Math.round(0.1 * Math.sqrt(2 * width * height));
  const fontSize = `${optimal}px`;
  const x = node.x0 + Math.abs(width / 2);
  const y = node.y0 + height / 2;
  const fontHeight = parseInt(fontSize, 10);
  const fill = getContrastingColorTo(avgColor);
  if (fontHeight > 8) {
    return {
      type: 'text',
      text,
      fontFamily,
      fontSize,
      fontWeight: 'bold',
      x,
      y,
      fill,
      stroke: getContrastingColorTo(fill), // helium supports stroke
      strokeWidth: 1,
      opacity: 0.5,
      anchor: 'center',
      data: {
        ...node.data,
        depth: node.depth,
        overlay: true,
      },
    };
  }
  return undefined;
};
