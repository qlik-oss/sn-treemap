import { treemap as d3Treemap } from 'd3-hierarchy';
import { createTextLabels, displayInvalidMessage, createOverlayLabel } from './labels';
import { TREEMAP_DEFINES } from './defines';
import { setupBrushes } from './setupBrushes.native';
import { incrementColor, getAverageColor } from './colorUtils';
import { getPattern } from './not-fetched-pattern';

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

const getNodeColor = (node, headerColor, box, chart, notFetchedPattern) => {
  if (node.header && !isNaN(node.value)) {
    return headerColor;
  }
  if (node.data.isNotFetchedOthers.value) {
    return notFetchedPattern;
  }
  return box.fill({
    datum: node.data,
    resources: {
      scale: (key) => chart.scale(key),
    },
  });
};

export const treemap = () => ({
  require: ['chart', 'renderer', 'element'],
  render({ data }) {
    const { headerColor, labels, level, invalidMessage, translator, box, theme, rtl } = this.settings.settings;
    const boundingRect = this.rect;

    const notFetchedPattern = getPattern(theme.getDataColorSpecials().others, 0.1);

    // this is needed for mobile to setup native selections
    setupBrushes(this.settings.brush, this.chart);

    if (!data.root || data.fields.length === 0) {
      return displayInvalidMessage({
        rect: this.rect,
        renderer: this.renderer,
        text: translator.translate('InvalidVisualization'),
        theme,
      });
    }
    const dataset = data.root
      .sum((d) => (isNaN(d.size.value) ? 0 : d.size.value))
      .sort((a, b) => {
        if (a.data.isOther.value !== b.data.isOther.value) {
          return a.data.isOther.value ? 1 : -1;
        }
        return b.value - a.value;
      });

    const root = d3Treemap()
      .size([boundingRect.width, boundingRect.height])
      .round(false)
      .paddingInner(TREEMAP_DEFINES.STROKE_WIDTH)
      .paddingOuter(TREEMAP_DEFINES.OUTER_PADDING)
      .paddingTop((node) => {
        // only want headers at level 1
        if (node.depth === 1 && node.height > 1) {
          const nodeHeight = node.y1 - node.y0;
          const showLable = nodeHeight > TREEMAP_DEFINES.HEADER_HEIGHT * 2;
          node.header = true;
          node.showLable = showLable;
          return (labels.headers || labels.auto) && showLable ? TREEMAP_DEFINES.HEADER_HEIGHT : 1;
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
    const treeHeight = root.height - 1;
    const overlayLevel = labels.auto ? 2 : !labels.overlay ? -1 : labels.header ? 2 : 1;

    const visit = (node) => {
      if (node.height === 0 && !node.data.isNotFetchedOthers.value) {
        return;
      }
      const height = node.y1 - node.y0;
      const width = node.x1 - node.x0;
      const area = height * width;
      if (area > 0) {
        const fill = getNodeColor(node, headerColor, box, this.chart, notFetchedPattern);
        if (node.data.isNotFetchedOthers.value) {
          incrementColor(node, fill, overlayLevel);
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
        } else if (node.header || node.height === 1) {
          if (node.header && height) {
            if (labels.headers || labels.auto) {
              createTextLabels({
                node,
                width,
                height,
                fill,
                valueLables,
                labels,
                renderer: this.renderer,
                theme,
                rtl,
              });
            } else if (labels.overlay) {
              overlayNodes.push(node);
            }
          } else if ((labels.leaves || labels.auto) && !node.header) {
            createTextLabels({
              node,
              width,
              height,
              fill,
              valueLables,
              labels,
              renderer: this.renderer,
              theme,
              rtl,
            });
          }

          if (node.depth === treeHeight) {
            // only consider for leaf nodes
            incrementColor(node, fill, overlayLevel);
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
        } else if (
          node.depth === 2 &&
          treeHeight > 1 &&
          node.data.label &&
          ((labels.headers && labels.overlay) || labels.auto)
        ) {
          // only show overlays if headers are disabled, other wise the headers
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

    const updateNodePositionX = (node, width) => {
      const nodeWidth = node.x1 - node.x0;
      node.x0 = width - node.x0 - nodeWidth;
      node.x1 = node.x0 + nodeWidth;
      if (node.children) {
        node.children.forEach((child) => updateNodePositionX(child, width));
      }
    };

    root.children.forEach((node, index) => {
      if (rtl) {
        updateNodePositionX(node, boundingRect.width);
        visit(node, index);
      } else {
        visit(node, index);
      }
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
        theme,
        rtl,
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
        theme,
      });
    }

    return [...rects, ...valueLables, ...overlayLabels, ...parentRects];
  },
});
