import { treemap as d3Treemap } from 'd3-hierarchy';
import { color as d3Color } from 'd3-color';
import { createTextLabels, displayInvalidMessage, createOverlayLabel } from './labels';
import { TREEMAP_DEFINES } from './defines';
import { setupBrushes } from './setupBrushes.native';

function toColor(num) {
  num >>>= 0;
  const b = num & 0xff;
  const g = (num & 0xff00) >>> 8;
  const r = (num & 0xff0000) >>> 16;
  const a = ((num & 0xff000000) >>> 24) / 255;
  return 'rgba(' + [r, g, b, a].join(',') + ')';
}

const buildPath = (root, node) => {
  const par = root.path(node);
  let path = ''; // `${node.data.select.source.field}/${node.data.select.value}`;
  par.forEach((p) => {
    if (p.data.source) {
      path = `${path}/${p.data.source.field}`;
    } else {
      path = `${path}/${p.data.select.label}`;
    }
  });
  path = `${path}/${node.data.select.value}`;
  return path;
};

const getNodeColor = (node, colorScale, headerColor, colorSettings, colorIndex) => {
  if (node.header && !isNaN(node.value)) {
    return headerColor;
  }
  if (node.data.expressionColor !== undefined && colorSettings.mode === 'byExpression') {
    if (colorSettings.measureScheme === 'dc') {
      const range = colorScale.range();
      const colorValue = node.data.expressionColor.value.qSubNodes[0].qAttrExps.qValues[0].qNum;
      const index = Math.trunc(colorValue % range.length);
      if (range) {
        return range[index];
      }
      return '#000000';
    }
    const exp = node.data.expressionColor.value;
    if (!isNaN(exp)) {
      return toColor(exp);
    } else if (node.data.expressionColorText !== undefined) {
      const hextString = `#${node.data.expressionColorText.value.toString(16)}`;
      return hextString;
    }
  }

  if (node.data?.expressionColor?.label?.qType === 'O') {
    return colorSettings.others;
  }

  if (
    colorScale.type === 'categorical-color' ||
    (colorSettings.measureScheme === 'dc' && colorSettings.mode !== 'byMeasure')
  ) {
    const range = colorScale.range();
    let colorValue = colorSettings.persistent ? node.data.color.value : colorIndex;
    if (colorValue < 0) {
      colorValue = node.data.select.value;
    }
    const index = colorValue % range.length;
    return range[index];
  }

  return colorScale(node.data.color.value);
};

export const treemap = () => ({
  require: ['chart', 'renderer', 'element'],
  render({ data }) {
    const { headerColor, getContrastingColorTo, labels, formatter, level, color, invalidMessage, translator } =
      this.settings.settings;
    const boundingRect = this.rect;

    // this is needed for mobile to setup native selections
    setupBrushes(this.settings.brush, this.chart);

    if (!data.root || data.fields.length === 0) {
      return displayInvalidMessage({
        rect: this.rect,
        renderer: this.renderer,
        text: translator.translate('InvalidVisualization'),
      });
    }
    const dataset = data.root
      .sum((d) => (isNaN(d.value) ? 0 : d.value))
      .sort((a, b) => {
        if (a.data.isOther.value !== b.data.isOther.value) {
          return a.data.isOther.value ? 1 : -1;
        }
        return b.value - a.value;
      });

    const incrementColor = (node, fill) => {
      const sumColor = d3Color(fill);
      if (sumColor) {
        const parent = node.depth === 4 ? node.parent.parent : node.parent;
        const parentSumColor = parent?.sumColor || {
          r: 0,
          g: 0,
          b: 0,
          count: 0,
        };
        parentSumColor.r += sumColor.r;
        parentSumColor.g += sumColor.g;
        parentSumColor.b += sumColor.b;
        parentSumColor.count += 1;
        parent.sumColor = parentSumColor;
      }
    };

    const getAverageColor = (node) => {
      const { sumColor } = node;
      if (sumColor) {
        const average = {
          r: Math.round(sumColor.r / sumColor.count),
          g: Math.round(sumColor.g / sumColor.count),
          b: Math.round(sumColor.b / sumColor.count),
        };
        const ar = `rgb(${average.r}, ${average.g}, ${average.b})`;
        const contrast = getContrastingColorTo(ar);
        const withAlpha = d3Color(contrast);
        withAlpha.opacity = 0.7;
        return withAlpha.toString();
      }
      return 'rgba(0, 0, 0, 0.7)';
    };

    const colorScale = this.chart.scale('color');
    const root = d3Treemap()
      .size([boundingRect.width, boundingRect.height])
      .round(false)
      .paddingInner(TREEMAP_DEFINES.STROKE_WIDTH)
      .paddingOuter(TREEMAP_DEFINES.OUTER_PADDING)
      .paddingTop((node) => {
        // only want headers at level 1
        if (node.depth === 1 && node.height !== 1) {
          const nodeHeight = node.y1 - node.y0;
          const showLable = nodeHeight > TREEMAP_DEFINES.HEAER_HEIGHT * 2;
          node.header = true;
          node.showLable = showLable;
          return labels.headers && showLable ? TREEMAP_DEFINES.HEAER_HEIGHT : 1;
        }
        return 1;
      })(dataset);

    // clean up data returned from plugin-q
    // and clean up data from treemap, the data is filtered so no zero area rects
    // are sent to picasso to render.
    const valueLables = [];
    const overlayNodes = [];
    const rects = [];
    const parentRects = [];
    const treeHeight = root.height;

    const visit = (node, index) => {
      const height = node.y1 - node.y0;
      const width = node.x1 - node.x0;
      if (height * width) {
        const fill = getNodeColor(node, colorScale, headerColor, color, index);
        if (node.header || node.height === 1) {
          incrementColor(node, fill);
          if (node.header && height) {
            if (labels.headers) {
              createTextLabels({
                node,
                width,
                height,
                fill,
                valueLables,
                labels,
                formatter,
                getContrastingColorTo,
                renderer: this.renderer,
              });
            } else if (labels.overlay) {
              overlayNodes.push(node);
            }
          } else if (labels.leaves && !node.header) {
            createTextLabels({
              node,
              width,
              height,
              fill,
              valueLables,
              labels,
              formatter,
              getContrastingColorTo,
              renderer: this.renderer,
            });
          }

          if (node.depth === treeHeight - 1) {
            const path = buildPath(root, node);
            const childRect = {
              type: 'rect',
              width,
              height,
              fill,
              x: node.x0,
              y: node.y0,
              data: {
                ...node.data,
                depth: node.depth,
                next: { ...node?.parent?.data },
                child: true,
                path,
              },
            };
            rects.push(childRect);
          } else if (node.header && !isNaN(node.value)) {
            const childRect = {
              type: 'rect',
              width,
              height,
              fill,
              x: node.x0,
              y: node.y0,
            };
            rects.push(childRect);
          }
        } else if (node.depth === 2 && treeHeight > 2 && node.data.label) {
          // only show overlays if headers are enabled, other wise the headers
          // take precedence
          node.data.next = node?.parent?.data;
          node.data.depth = node.depth;
          overlayNodes.push(node);
        }
        if (node.depth - 1 === level) {
          // this is a decorator rect
          const path = buildPath(root, node);
          node.data.next = node?.parent?.data;
          const childRect = {
            type: 'rect',
            width,
            height,
            fill: 'rgba(255,255,255,0)',
            opacity: 0,
            x: node.x0,
            y: node.y0,
            data: {
              ...node.data,
              depth: node.depth,
              next: { ...node?.parent?.data },
              path,
            },
          };
          rects.push(childRect);
        }
      }

      if (node.children) {
        node.children.forEach((child, childIndex) => visit(child, childIndex));
      }
    };

    root.children.forEach((node, index) => {
      visit(node, index);
    });

    const overlayLabels = [];
    overlayNodes.forEach((node) => {
      const height = node.y1 - node.y0;
      const width = node.x1 - node.x0;
      const avgColor = getAverageColor(node);
      const label = createOverlayLabel({
        node,
        avgColor,
        width,
        height,
        renderer: this.renderer,
        getContrastingColorTo,
      });
      if (label) {
        overlayLabels.push(label);
      }
    });

    if (rects.length === 0) {
      return displayInvalidMessage({
        rect: this.rect,
        renderer: this.renderer,
        text: invalidMessage,
      });
    }

    return [...rects, ...valueLables, ...overlayLabels, ...parentRects];
  },
});
