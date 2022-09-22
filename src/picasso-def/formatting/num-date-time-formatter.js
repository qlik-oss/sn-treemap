// Scavanged from sense-client on 2020-03-11
import NumberFormatter from './number-formatter';
import DateFormatter from './date-formatter';

const TYPES = {
  AUTO: 'U',
  INTEGER: 'I',
  NUMBER: 'R',
  FIXED_TO: 'F',
  MONEY: 'M',
  DATE: 'D',
  TIME: 'T',
  DATE_TIME: 'TS',
  INTERVAL: 'IV',
};

class NumDateTimeFormatter {
  /** @lends module:assets/objects/utils/num-date-time-formatter~NumDateTimeFormatter# */
  /**
   * @constructs
   * @param {String} pattern
   * @param {String} [thousand]
   * @param {String} [decimal]
   * @param {String} [type]
   */
  constructor(localeInfo, pattern, thousand, decimal, type) {
    const info = localeInfo || {};
    this.localeInfo = info;
    this.pattern = pattern || '';
    this.decimalDelimiter =
      typeof decimal === 'string'
        ? decimal
        : typeof info.qDecimalSep === 'string'
        ? info.qDecimalSep
        : '.';
    this.thousandDelimiter =
      typeof thousand === 'string'
        ? thousand
        : typeof info.qThousandSep === 'string' &&
          this.decimalDelimiter !== info.qThousandSep
        ? info.qThousandSep
        : '';

    this.type = type || TYPES.AUTO;

    if (type === TYPES.AUTO) {
      this.pattern = `#${this.decimalDelimiter}##A`;
    }

    this._numberFormatter = new NumberFormatter(localeInfo);
    this._dateFormatter = new DateFormatter(localeInfo);

    this.prepare();
  }

  clone() {
    return new NumDateTimeFormatter(
      this.localeInfo,
      this.pattern,
      this.thousandDelimiter,
      this.decimalDelimiter,
      this.type,
    );
  }

  prepare(pattern, t, d) {
    if (!pattern) {
      pattern = this.pattern;
    }

    if (!pattern) {
      switch (this.type) {
        case TYPES.INTEGER:
          pattern = '##############';
          break;
        case TYPES.NUMBER:
          pattern = Array(this.localeInfo.qnDec !== undefined || 11).join('#');
          break;
        case TYPES.FIXED_TO:
          pattern =
            `#${this.localeInfo.qDecimalSep}` ||
            `.${Array(this.localeInfo.qnDec || 4).join('#')}`;
          break;
        case TYPES.MONEY:
          pattern = this.localeInfo.qMoneyFmt;
          if (!d) {
            d = this.localeInfo.qMoneyDecimalSep || '.';
          }
          if (!t && d !== this.localeInfo.qMoneyThousandSep) {
            t = this.localeInfo.qMoneyThousandSep;
          }
          break;
        case TYPES.DATE:
          pattern = this.localeInfo.qDateFmt || 'YYYY-MM-DD';
          break;
        case TYPES.DATE_TIME:
          pattern = this.localeInfo.qTimestampFmt || 'YYYY-MM-DD hh:mm:ss';
          break;
        case TYPES.TIME:
        case TYPES.INTERVAL:
          pattern = this.localeInfo.qTimeFmt || 'hh:mm:ss';
          break;
        default:
          pattern = '##########';
          break;
      }
    }

    this._numberFormatter.pattern = this.pattern;
    this._dateFormatter.pattern = this.pattern;
    this._numberFormatter.thousandDelimiter = this.thousandDelimiter;
    this._numberFormatter.decimalDelimiter = this.decimalDelimiter;
    this._numberFormatter.type = this.type;

    this._numberFormatter.prepare(pattern, t, d);

    this._prepared = {
      pattern,
      t,
      d,
    };
  }

  /**
   *
   * @param value
   * @param [pattern] - use this pattern instead of prep.pattern temporarily
   * @returns {*}
   */
  formatValue(value, pattern) {
    let date;
    const prep = this._prepared;

    if (
      value === 'NaN' ||
      (typeof value === 'number' && Number.isNaN(+value))
    ) {
      return '-';
    }

    if (Number.isNaN(+value) || typeof value !== 'number') {
      return `${value}`;
    }

    switch (this.type) {
      case TYPES.DATE:
      case TYPES.TIME:
      case TYPES.DATE_TIME:
        date = new Date(
          1899,
          11,
          30 + Math.floor(value),
          0,
          0,
          24 * 60 * 60 * (value - Math.floor(value)),
        );
        if (Number.isNaN(+date.getTime())) {
          // invalid date
          return this._numberFormatter.format(value, '0', prep.t, prep.d);
        }
        return this._dateFormatter.format(date, pattern || prep.pattern);
      case TYPES.INTERVAL:
        return this._dateFormatter.format(value, prep.pattern); // will be formatted as interval, i.e. the amount of days, hours etc
      default:
        return this._numberFormatter.formatValue(value);
    }
  }

  format(value, pattern, t, d) {
    if (
      value === 'NaN' ||
      (typeof value === 'number' && Number.isNaN(+value))
    ) {
      return '-';
    }

    if (Number.isNaN(+value) || typeof value !== 'number') {
      return `${value}`;
    }

    this.prepare(pattern, t, d);
    return this.formatValue(value);
  }

  createPatternFromRange(min, max, abbreviate) {
    let p = '';
    let i;
    const minMagnitude = Number(Number(min).toExponential().split('e')[1]);
    const maxMagnitude = Number(Number(max).toExponential().split('e')[1]);
    const minDecimals = Math.min(
      Math.abs(minMagnitude),
      Math.abs(maxMagnitude),
    );
    const range = Math.abs(max - min);
    let reduceBy;
    const rangeMagnitude = Number(
      Number(range / 50)
        .toExponential()
        .split('e')[1],
    );
    let nDecimals;

    nDecimals = Math.abs(rangeMagnitude);

    if (range === 0) {
      return `0${this.decimalDelimiter}##${abbreviate ? 'A' : ''}`;
    }

    if (rangeMagnitude >= 0) {
      nDecimals = abbreviate ? Math.max(2, minDecimals - rangeMagnitude) : 0;
    } else {
      reduceBy =
        (abbreviate ? minDecimals - (minDecimals % 3) : 0) *
        (maxMagnitude < 0 ? 1 : -1);
      nDecimals -= reduceBy;
    }

    if (this.thousandDelimiter) {
      p += `#${this.thousandDelimiter}##0`;
    } else {
      p += '0';
    }

    if (nDecimals) {
      p += this.decimalDelimiter;
      for (i = 0; i < nDecimals; i++) {
        p += '#';
      }
    }
    return p + (abbreviate ? 'A' : '');
  }
}

NumDateTimeFormatter.getSignificantIntegers = function (value) {
  return significantIntegers(value);
};

NumDateTimeFormatter.getSignificantDecimals = function (value) {
  return significantDecimals(value);
};

function significantIntegers(num) {
  if (Number.isNaN(+num) || !Number.isFinite(+num)) {
    return 1;
  }
  const n = Number(num).toExponential();
  const exp = n.split('e');
  let integers = 1;
  if (exp[1][0] === '+') {
    integers += Number(exp[1]);
  }
  return integers;
}

function significantDecimals(num) {
  if (Number.isNaN(+num) || !Number.isFinite(+num)) {
    return 0;
  }
  const n = Number(num).toExponential();
  let exp = n.split('e');
  let decimals = 0;
  let integers;
  if (exp[1][0] === '-') {
    decimals = Math.abs(Number(exp[1]));
    exp = exp[0].split('.');
    if (exp[1]) {
      decimals += exp[1].length;
    }
  } else {
    integers = Number(exp[1]);
    exp = exp[0].split('.');
    decimals = exp[1] ? exp[1].length - integers : 0;
  }
  return decimals;
}

export default NumDateTimeFormatter;
