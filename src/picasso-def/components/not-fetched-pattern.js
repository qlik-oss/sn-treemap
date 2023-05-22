const dummyCanvas = document.createElement('canvas');

const ctx = dummyCanvas.getContext('2d');

export function getPattern() {
  const stroke = 'rgba(0, 0, 0, 0.05)';
  const background = 'rgba(255, 255, 255, 0.3)';

  const ratio = 1;
  dummyCanvas.width = ratio * 8;
  dummyCanvas.height = ratio * 8;
  ctx.save();
  ctx.scale(ratio, ratio);

  ctx.strokeStyle = background;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(9, -1);
  ctx.lineTo(-1, 9);
  ctx.moveTo(1, -1);
  ctx.lineTo(-1, 1);
  ctx.moveTo(9, 7);
  ctx.lineTo(7, 9);
  ctx.stroke();

  ctx.strokeStyle = stroke;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(5, -1);
  ctx.lineTo(-1, 5);
  ctx.moveTo(9, 3);
  ctx.lineTo(3, 9);
  ctx.stroke();

  ctx.restore();
  return ctx.createPattern(dummyCanvas, 'repeat');
}
