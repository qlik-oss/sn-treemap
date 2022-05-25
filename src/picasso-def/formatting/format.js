/* eslint-disable eqeqeq */
// Scavanged from sense-client on 2020-03-11
/**
 * @preserve IntegraXor Web SCADA - JavaScript Number Formatter
 * http://www.integraxor.com/
 * author: KPL, KHL
 * (c)2011 ecava
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */

// //////////////////////////////////////////////////////////////////////////////
// param: Mask & Value
// //////////////////////////////////////////////////////////////////////////////
/*
 * Modularized by Qliktech (Miralem Drek (mek))
 *
 */
export default function format(m, v) {
  if (!m || isNaN(+v)) {
    return v; // return as it is.
  }
  // convert any string to number according to formation sign.
  var v = m.charAt(0) == '-' ? -v : +v;
  const isNegative = v < 0 ? (v = -v) : 0; // process only abs(), and turn on flag.

  // search for separator for grp & decimal, anything not digit, not +/- sign, not #.
  // eslint-disable-next-line no-useless-escape
  const result = m.match(/[^\d\-\+#]/g);
  const Decimal = (result && result[result.length - 1]) || '.'; // treat the right most symbol as decimal
  const Group = (result && result[1] && result[0]) || ','; // treat the left most symbol as group separator

  // split the decimal for the format string if any.
  var m = m.split(Decimal);
  // Fix the decimal first, toFixed will auto fill trailing zero.
  v = v.toFixed(m[1] && m[1].length);
  v = `${+v}`; // convert number to string to trim off *all* trailing decimal zero(es)

  // fill back any trailing zero according to format
  const pos_trail_zero = m[1] && m[1].lastIndexOf('0'); // look for last zero in format
  const part = v.split('.');
  // integer will get !part[1]
  if (!part[1] || (part[1] && part[1].length <= pos_trail_zero)) {
    v = (+v).toFixed(pos_trail_zero + 1);
  }
  const szSep = m[0].split(Group); // look for separator
  m[0] = szSep.join(''); // join back without separator for counting the pos of any leading 0.

  const pos_lead_zero = m[0] && m[0].indexOf('0');
  if (pos_lead_zero > -1) {
    while (part[0].length < m[0].length - pos_lead_zero) {
      part[0] = `0${part[0]}`;
    }
  } else if (+part[0] == 0) {
    part[0] = '';
  }

  v = v.split('.');
  v[0] = part[0];

  // process the first group separator from decimal (.) only, the rest ignore.
  // get the length of the last slice of split result.
  const pos_separator = szSep[1] && szSep[szSep.length - 1].length;
  if (pos_separator) {
    const integer = v[0];
    let str = '';
    const offset = integer.length % pos_separator;
    for (let i = 0, l = integer.length; i < l; i++) {
      str += integer.charAt(i); // ie6 only support charAt for sz.
      // -pos_separator so that won't trail separator on full length
      if (!((i - offset + 1) % pos_separator) && i < l - pos_separator) {
        str += Group;
      }
    }
    v[0] = str;
  }

  v[1] = m[1] && v[1] ? Decimal + v[1] : '';
  return (isNegative ? '-' : '') + v[0] + v[1]; // put back any negation and combine integer and fraction.
}
