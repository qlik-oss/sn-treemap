const defaultHyphen = '-';
const defaultEllipsis = '…';

/**
 * Truncates a single line of text if the text does not fit inside the given width.
 * @param text
 * @param {Number} width
 * @param {String} font
 * @returns {{text: String, rest: String}}
 */
function truncate(text, width, ellipsis, renderer, fontSize, fontFamily) {
  let s = text;
  let i;
  let temp;
  let tempEllipsis;
  let rest;
  const minCharWidth =
    renderer.measureText({
      text: 'i',
      fontSize,
      fontFamily,
    }).width <= width;
  const maxNumLetters = Math.ceil(width / minCharWidth);
  ellipsis = ellipsis || defaultEllipsis;

  if (!text || !width) {
    rest = undefined;
  } else if (
    renderer.measureText({
      text: s,
      fontSize,
      fontFamily,
    }).width > width
  ) {
    for (i = Math.min(maxNumLetters, s.length); i > 0; i--) {
      temp = s.substring(0, i - 1);
      tempEllipsis = temp.trim() + ellipsis;
      if (
        renderer.measureText({
          text: tempEllipsis,
          fontSize,
          fontFamily,
        }).width <= width
      ) {
        rest = s.substring(i - 1);
        s = tempEllipsis;
        break;
      }
    }
    if (!i) {
      rest = s;
      s = defaultEllipsis;
    }
  }
  return {
    text: s,
    rest,
  };
}

function isNumber(v) {
  return typeof v === 'number' && Number.isFinite(v);
}

function lineWrap(text, width, maxNumLines, renderer, fontSize, fontFamily) {
  // wrap text at white space
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

  if (typeof maxNumLines === 'number' && textLines.length >= maxNumLines) {
    return textLines.slice(0, maxNumLines);
  }

  for (r = 0; r < textLines.length; r++) {
    textLine = textLines[r] || '';
    words = textLine.split(/\s+/);
    line = words[0];
    remainder = '';
    for (n = 1; n < words.length; n++) {
      testLine = `${line} ${words[n]}`;
      testWidth = renderer.measureText({
        text: testLine,
        fontSize,
        fontFamily,
      }).width;
      if (testWidth > width && (typeof maxNumLines !== 'number' || maxNumLines > lines.length)) {
        lines.push(line);
        line = words[n];
      } else {
        line = testLine;
      }

      if (typeof maxNumLines === 'number' && lines.length >= maxNumLines) {
        remainder = words.slice(n + 1).join(' ');
        break;
      }
    }

    if (typeof maxNumLines !== 'number' || lines.length < maxNumLines) {
      lines.push(line);
    } else {
      lines[Math.max(0, lines.length - 1)] = `${lines[Math.max(0, lines.length - 1)] || ''} ${line} ${remainder}`;
    }
  }

  return lines;
}

function wordWrap(lines, width, maxNumLines, ellipsis, renderer, fontSize, fontFamily) {
  if (!lines || !lines.length) {
    return [];
  }

  let result = [];
  const cLines = lines.slice();
  let exploded;
  let remainder;
  let line;
  let i;

  cLines.filter(
    (s) =>
      // sanitize
      !!s
  );

  if (typeof width !== 'number' || width < 0) {
    return lines.slice();
  }

  for (i = 0; i < cLines.length; i++) {
    line = cLines[i];

    remainder = null;
    if (!line) {
      // eslint-disable-next-line no-continue
      continue;
    } else if (
      line.length <= 1 ||
      renderer.measureText({
        text: line,
        fontSize,
        fontFamily,
      }).width <= width
    ) {
      result.push(line);
      // eslint-disable-next-line no-continue
      continue;
    } else {
      exploded = splitWord(line, width, maxNumLines - result.length, renderer, fontSize, fontFamily);
      if (exploded.length <= 1) {
        // could not shorten current line -> add it to results
        result.push(exploded[0]);
        // eslint-disable-next-line no-continue
        continue;
      }

      remainder = exploded.pop(); // last element could be longer than width limit
      result = result.concat(exploded);

      if (cLines[i + 1]) {
        // add remainder to next line
        if (
          renderer.measureText({
            text: `${remainder} ${cLines[i + 1]}`,
            fontSize,
            fontFamily,
          }).width > width &&
          result.length + cLines.length - i <= maxNumLines
        ) {
          // If adding to the next line will force that to break as well and we are not close to the max limit, then create a new line inbetween instead
          cLines.splice(i + 1, 0, remainder);
        } else {
          cLines[i + 1] = `${remainder} ${cLines[i + 1]}`;
        }
      } else {
        // TODO - safeguard against endless loop (mek)
        cLines.push(remainder);
      }
    }
  }

  result.forEach((s, j, arr) => {
    arr[j] = s ? s.trim() : s;
  });

  if (result.length > maxNumLines) {
    result = result.splice(0, maxNumLines); // if more lines than allowed, truncate the last line
    result[result.length - 1] = truncate(
      result[result.length - 1],
      width,
      ellipsis,
      renderer,
      fontSize,
      fontFamily
    ).text;
  } else {
    // truncate last line only if that line does not fit
    line = result[result.length - 1];
    if (
      line &&
      line.length > 1 &&
      renderer.measureText({
        text: line,
        fontSize,
        fontFamily,
      }).width > width
    ) {
      result[result.length - 1] = truncate(line, width, ellipsis, renderer, fontSize, fontFamily).text;
    }
  }

  return result;
}
/* function getLines(text, width, measureText) {
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
      if (testWidth > width) {
        lines.push(line);
        line = words[n];
      } else {
        line = testLine;
      }
    }

    lines[Math.max(0, lines.length - 1)] = `${lines[Math.max(0, lines.length - 1)] || ''} ${line} ${remainder}`;
  }

  return lines;
} */

function wrapText(text, maxWidth, maxNumLines, ellipsis, renderer, fontSize, fontFamily) {
  let lines;

  if (Number.isNaN(+maxWidth)) {
    return [text];
  }

  if (maxNumLines > 1) {
    lines = lineWrap(text, maxWidth, maxNumLines, renderer, fontSize, fontFamily);
  } else if (maxNumLines === undefined) {
    maxNumLines = text.split(/(\s+)/).filter((s) => s !== ' ');
  } else {
    lines = [text];
  }

  lines = wordWrap(lines, maxWidth, maxNumLines, ellipsis, renderer, fontSize, fontFamily);

  return lines;
}

function explodeWord(text, width, maxNumLines, charWidth, renderer, fontSize, fontFamily) {
  let i;
  let left = text;
  let right = '';
  let lastChar;
  let result = [];

  if (isNumber(maxNumLines) && maxNumLines <= 1) {
    return [text];
  }

  const maxNumChars = Math.ceil(width / charWidth);
  const num = Math.min(text.length, maxNumChars);

  for (i = num; i > 0; i--) {
    left = text.substring(0, i);
    lastChar = text.substring(i - 1, i);
    // When remainder is added to a new line there is a chance of breaking at a space
    if (lastChar === ' ') {
      left = text.substring(0, i - 1);
    } else {
      left += defaultHyphen;
    }
    right = text.substring(i);
    if (
      renderer.measureText({
        text: left,
        fontSize,
        fontFamily,
      }).width <= width
    ) {
      break;
    }
  }
  if (
    (!i && !left) ||
    renderer.measureText({
      text: left,
      fontSize,
      fontFamily,
    }).width > width
  ) {
    left = text.substring(0, 1);
    right = text.substring(1);
  }

  result.push(left);
  if (!right) {
    return result;
  }

  if (
    renderer.measureText({
      text: right,
      fontSize,
      fontFamily,
    }).width > width
  ) {
    right = explodeWord(right, width, maxNumLines - 1, charWidth, renderer, fontSize, fontFamily);
    result = result.concat(right);
  } else {
    result.push(right);
  }
  // Remove any spaces added by the remainder
  return result.filter((item) => item.trim() !== '');
}

function splitWord(text, width, maxNumLines, renderer, fontSize, fontFamily) {
  if (!text || !width) {
    return [];
  }

  const charWidth = Math.max(
    1,
    renderer.measureText({
      text: 'i',
      fontSize,
      fontFamily,
    }).width
  );

  return explodeWord(text, width, maxNumLines, charWidth, renderer, fontSize, fontFamily);
}

export { wrapText, truncate };
