/**
 * Truncates a single line of text if the text does not fit inside the given width.
 * @param text
 * @param {Number} width
 * @param {String} font
 * @returns {{text: String, rest: String}}
 */
function truncate(text, width, renderer, fontSize, fontFamily) {
  const approximation = renderer.measureText({text: 'W', fontSize, fontFamily});
  const charWidth = width / approximation.width
  // const actual =  renderer.measureText({text, fontSize, fontFamilay});
  const textWidth = approximation.width * text.length;
  if(textWidth > width) {
    return `${text.slice(0,  charWidth)}...`;
  }
  return text;
}

function getLines(text, width, measureText) {
  let n;

  let r;
  const textLines = text ? text.split(/\n+|\r+|\r\n/) : [];
  const lines = [];
  let testLine;
  let testWidth;
  let words = text ? text.split(/\s+/) : [];
  let line = textLines[0];
  let remainder;
  let textLine;
  if (typeof width !== 'number' || width <= 0) {
    return [text];
  }


  for (r = 0; r < textLines.length; r++) {
    textLine = textLines[r] || '';
    words = textLine.split(/\s+/);
    line = words[0];
    remainder = '';
    for (n = 1; n < words.length; n++) {
      testLine = `${line} ${words[n]}`;
      testWidth = measureText(testLine).width;
      if (testWidth > width ) {
        lines.push(line);
        line = words[n];
      } else {
        line = testLine;
      }
    }

    lines[Math.max(0, lines.length - 1)] = `${lines[Math.max(0, lines.length - 1)] || ''} ${line} ${remainder}`;
  }

  return lines;
}



function cram(text, rect, measureText, renderer, fontSize, fontFamily) {
  const lines = getLines(text, rect.width, measureText);
  // truncate last line
  if(lines.length > 1) {
    lines[lines.length - 1] = truncate(lines[lines.length - 1], rect.width, renderer, fontSize, fontFamily);
    return lines.join('\n');
  }
  return truncate(text, rect.width, renderer, fontSize, fontFamily);
}


export {
  truncate,
  cram,
};
