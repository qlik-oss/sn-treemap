import { wrapText } from './text-helper';

const TREEMAP_LABEL_FONTSIZE = 14;
const TREEMAP_VALUE_FONTSIZE = 12;
const TREEMAP_MESSAGE_SIZE = 16;
const MIN_AREA_FOR_LABELS = 4000;
const ellipsis = '…';

export const createTextLabels = ({ node, width, height, fill, valueLables, labels, renderer, theme, rtl }) => {
  const area = width * height;

  if (area < MIN_AREA_FOR_LABELS) {
    return;
  }

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
    const labelText = node.data.label;
    const fontFamily = theme.getStyle('object.treemap', 'leaf.label', 'fontFamily') || 'Source Sans Pro';
    const fontSize = theme.getStyle('object.treemap', 'leaf.label', 'fontSize') || TREEMAP_LABEL_FONTSIZE + 'px';
    const top = node.y0 + 4;
    const valueText = node.data.size.label;
    let finalTextArray = [];
    let lines = [];

    if (labels.values) {
      finalTextArray = processText({
        text: [labelText, valueText],
        fontSize,
        fontFamily,
        renderer,
        width,
        height,
        labels,
      });
      lines = finalTextArray.lines;
    } else {
      finalTextArray = processText({
        text: labelText,
        fontSize,
        fontFamily,
        renderer,
        width,
        height,
        labels,
      });
      lines = finalTextArray.lines;
    }
    let finalText = '';
    Array.from(lines).forEach((line) => {
      finalText = finalText + line + '\n';
    });

    valueLables.push({
      type: 'text',
      text: finalText,
      fontFamily,
      fontSize,
      fontWeight: 'normal',
      x: rtl
        ? node.x1 - finalTextArray.textSize.width - Math.abs(parseInt(fontSize, 10) / 2)
        : node.x0 + Math.abs(parseInt(fontSize, 10) / 2),
      y: top,
      fill: fill ? theme.getContrastingColorTo(fill) : 'rgb(0, 0, 0)',
      baseline: 'text-before-edge',
      wordBreak: 'break-word',
      data: { ...node.data, depth: node.depth },
    });
  }
};

const processText = ({ text, fontSize, fontFamily, renderer, width, height, labels }) => {
  let maxLines = [];
  let totalMaxNumLines = 0;
  let lines = [];

  // allow break if white space in label
  const texts = text[0].split(/(\s+)/).filter((s) => s !== ' ');
  const maxNumLines = labels.values ? [-1, 1] : [-1];

  // find maxLength
  const maxChars = texts.reduce((prev, current) => (prev.length > current.length ? prev : current));
  const textSize = renderer.measureText({
    text: maxChars,
    fontSize,
    fontFamily,
  });
  const maxAllowedLines = height ? Math.max(1, Math.floor(parseInt(height / textSize.height, 10))) : maxNumLines || 1;

  if (Array.isArray(maxNumLines)) {
    maxNumLines.forEach((v) => {
      totalMaxNumLines += Number.isNaN(+v) || v <= 0 ? 0 : v;
    });

    maxNumLines.forEach((v) => {
      maxLines.push(Number.isNaN(+v) || v <= 0 ? maxAllowedLines - totalMaxNumLines : v); // if v < 0 then use the number of lines that are available
    });
  } else {
    maxLines = [
      Number.isNaN(+maxNumLines) || maxNumLines <= 0 ? maxAllowedLines : Math.min(maxAllowedLines, maxNumLines),
    ];
  }

  const verticalPadding = 12;
  const maxWidth = width - verticalPadding;
  let maxheight = 0;
  if (textSize.width < maxWidth) {
    // now calc maxheight
    maxheight = texts.reduce(
      (acc, cur) =>
        acc +
        renderer.measureText({
          text: cur,
          fontSize,
          fontFamily,
        }).height,
      0
    );
  }

  if (Array.isArray(text)) {
    text.forEach((s, i) => {
      if (lines.length < maxAllowedLines) {
        lines = lines.concat(wrapText(s, maxWidth, maxLines[i], ellipsis, renderer, fontSize, fontFamily));
      }
    }, this);
  } else {
    lines = wrapText(text, maxWidth, maxLines[0], ellipsis, renderer, fontSize, fontFamily);
  }

  return { lines, textSize, maxheight };
};

const headerText = ({ node, width, fill, valueLables, renderer, theme, rtl }) => {
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
    text = wrapText(text, width - 10, undefined, undefined, renderer, fontSize, fontFamily);
  }
  valueLables.push({
    type: 'text',
    text,
    fontFamily,
    fontSize,
    fontWeight: 'normal',
    x: rtl ? node.x1 - parseInt(fontSize, 10) / 2 : node.x0 + parseInt(fontSize, 10) / 2,
    y: top + parseInt(fontSize, 10) / 2,
    fill: fill ? theme.getContrastingColorTo(fill) : 'rgb(0, 0, 0)',
    anchor: rtl ? 'right' : 'left',
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

export const createOverlayLabel = ({ node, avgColor, width, height, renderer, theme }) => {
  let lines = [];
  const text = node.data.label;
  const maxNumLines = /\s+/.test(text) ? 2 : 1; // allow break if white space in label
  const fontFamily = theme.getStyle('object.treemap', 'label.value', 'fontFamily') || 'Source Sans Pro';
  const optimal = Math.round(0.1 * Math.sqrt(2 * width * height));
  const fontSize = `${optimal}px`;

  const textSize = renderer.measureText({
    text,
    fontSize,
    fontFamily,
  });

  let finalText = '';
  if (textSize.width > width - 8) {
    lines = wrapText(text, width - 10, maxNumLines, ellipsis, renderer, fontSize, fontFamily);
    if (Array.isArray(lines) && lines.length > 0) {
      lines.forEach((line) => {
        finalText = finalText + line + '\n';
      });
    }
  } else {
    finalText = text;
  }
  const x = node.x0 + Math.abs(width / 2);
  const y = node.y0 + height / 2;
  const fontHeight = parseInt(fontSize, 10);
  const fill = theme.getContrastingColorTo(avgColor);
  if (fontHeight > 8) {
    return {
      type: 'text',
      text: finalText,
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
      wordBreak: 'break-word',
      data: {
        ...node.data,
        depth: node.depth,
        overlay: true,
      },
    };
  }
  return undefined;
};
