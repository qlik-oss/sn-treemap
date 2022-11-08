import { truncate, cram } from './text-helper';

const TREEMAP_LABEL_FONTSIZE = 14;
const TREEMAP_VALUE_FONTSIZE = 12;
const TREEMAP_MESSAGE_SIZE = 16;

export const createTextLabels = ({ node, width, height, fill, valueLables, labels, formatter, renderer, theme }) => {
  const area = width * height;
  if (area && node?.data?.label) {
    if (node.header) {
      headerText({
        node,
        width,
        height,
        fill,
        renderer,
        valueLables,
        labels,
        theme,
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
    const fontFamily = theme.getStyle('object.treemap', 'leaf.label', 'fontFamily') || 'Source Sans Pro';
    const fontSize = theme.getStyle('object.treemap', 'leaf.label', 'fontSize') || TREEMAP_LABEL_FONTSIZE + 'px';
    const textSize = renderer.measureText({
      text: maxChars,
      fontSize,
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
            fontSize,
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
          fontSize,
          fontFamily,
        });

        text = cram(
          text,
          { width: width - 8, height },
          (val) => renderer.measureText({ text: val, fontFamily, fontSize }),
          renderer,
          fontSize,
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
          fontSize,
          fontWeight: 'normal',
          x: node.x0 + Math.abs(parseInt(fontSize, 10) / 2),
          y,
          fill: fill ? theme.getContrastingColorTo(fill) : 'rgb(0, 0, 0)',
          baseline: 'text-before-edge',
          wordBreak: 'break-word',
          data: { ...node.data, depth: node.depth },
        });
      }
    }
  }
};

const headerText = ({ node, width, fill, valueLables, renderer, theme }) => {
  const verticalPadding = 12;
  let text = node.data.label;
  const fontFamily = theme.getStyle('object.treemap', 'branch.label', 'fontFamily') || 'Source Sans Pro';
  const fontSize = theme.getStyle('object.treemap', 'branch.label', 'fontSize') || TREEMAP_VALUE_FONTSIZE + 'px';
  const textSize = renderer.measureText({
    text,
    fontSize,
    fontFamily,
  });
  const top = node.y0 + 4;
  if (node.header && !node.showLable) {
    return;
  }
  if (textSize.width > width - 8) {
    text = truncate(text, width - 10, renderer, fontSize, fontFamily);
  }
  valueLables.push({
    type: 'text',
    text,
    fontFamily,
    fontSize,
    fontWeight: 'normal',
    x: node.x0 + parseInt(fontSize, 10) / 2,
    y: top + parseInt(fontSize, 10) / 2,
    fill: fill ? theme.getContrastingColorTo(fill) : 'rgb(0, 0, 0)',
    anchor: 'left',
    baseline: 'central',
    maxWidth: width - verticalPadding,
    data: { ...node.data, depth: node.depth },
  });
};

export const displayInvalidMessage = ({ rect, text, renderer, theme }) => {
  const fontFamily = theme.getStyle('object.treemap', 'label.value', 'fontFamily') || 'Source Sans Pro';
  const fontSize = theme.getStyle('object.treemap', 'label.value', 'fontSize') || TREEMAP_MESSAGE_SIZE + 'px';
  const textSize = renderer.measureText({
    text,
    fontSize,
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

export const createOverlayLabel = ({ node, avgColor, width, height, theme }) => {
  const text = node.data.label;
  const fontFamily = theme.getStyle('object.treemap', 'label.value', 'fontFamily') || 'Source Sans Pro';
  const optimal = Math.round(0.1 * Math.sqrt(2 * width * height));
  const fontSize = `${optimal}px`;
  const x = node.x0 + Math.abs(width / 2);
  const y = node.y0 + height / 2;
  const fontHeight = parseInt(fontSize, 10);
  const fill = theme.getContrastingColorTo(avgColor);
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
      stroke: theme.getContrastingColorTo(fill), // helium supports stroke
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
