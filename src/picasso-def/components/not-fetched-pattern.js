const dummyCanvas = document.createElement('canvas');

const ctx = dummyCanvas.getContext('2d');

export function getPattern(color) {
  const ratio = 1;
  dummyCanvas.width = ratio * 8;
  dummyCanvas.height = ratio * 8;
  ctx.save();
  ctx.fillStyle = color;
  ctx.strokeStyle = color === '#ffffff' ? '#F2F2F2' : '#ffffff';
  ctx.lineWidth = 2;
  ctx.scale(ratio, ratio);
  ctx.beginPath();
  ctx.moveTo(5, -1);
  ctx.lineTo(-1, 5);

  ctx.moveTo(9, 3);
  ctx.lineTo(3, 9);
  ctx.stroke();
  const pattern = ctx.createPattern(dummyCanvas, 'repeat');
  ctx.rect(0, 0, dummyCanvas.width, dummyCanvas.height);
  ctx.fillStyle = pattern;
  ctx.fill;
  return pattern;
}
