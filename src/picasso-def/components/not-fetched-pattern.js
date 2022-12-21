import { color as d3Color } from 'd3-color';

const dummyCanvas = document.createElement('canvas');

const ctx = dummyCanvas.getContext('2d');

export function getPattern(color, alpha) {
  const stroke = d3Color(color);
  stroke.opacity = alpha;

  const ratio = 1;
  dummyCanvas.width = ratio * 8;
  dummyCanvas.height = ratio * 8;
  ctx.save();
  ctx.fillStyle = color;
  ctx.strokeStyle = stroke.toString();
  ctx.lineWidth = 2;
  ctx.scale(ratio, ratio);
  ctx.beginPath();
  ctx.moveTo(5, -1);
  ctx.lineTo(-1, 5);

  ctx.moveTo(9, 3);
  ctx.lineTo(3, 9);
  ctx.stroke();
  ctx.restore();
  return ctx.createPattern(dummyCanvas, 'repeat');
}
