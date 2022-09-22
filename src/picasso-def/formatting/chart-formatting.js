// Scavanged from sense-client on 2020-03-11 + changed extend
import extend from 'extend';
import NumDateTimeFormatter from './num-date-time-formatter';

function isAutoFormat(measure) {
  return (
    !!measure.qIsAutoFormat &&
    ['M', 'D', 'T', 'TS', 'IV'].indexOf(measure.qNumFormat.qType) < 0
  );
}

class ChartFormatting {
  constructor(localeInfo, measureInfo) {
    this.localeInfo = localeInfo;
    const measureFormatters = this.getFormattersForMeasures(measureInfo);

    let tempFormatters = extend(true, [], measureFormatters);

    if (
      tempFormatters &&
      tempFormatters.length === 1 &&
      measureInfo[0].isCustomFormatted
    ) {
      tempFormatters = null;
    } else {
      let countNullFormatters = 0;
      for (let i = 0; i < tempFormatters.length; i++) {
        if (measureInfo[i].isCustomFormatted) {
          tempFormatters[i] = null;
          countNullFormatters++;
        }
      }
      if (countNullFormatters === tempFormatters.length) {
        tempFormatters = null;
      }
    }

    this.measureFormatters = tempFormatters;

    // this.measureFormatters = measureInfo && measureInfo.length && !measureInfo[0].isCustomFormatted ? measureFormatters : null;
    this.combinedMeasuresFormatter = this.getFormatterFromFormatters(
      measureFormatters,
    );
  }

  createFormatter() {
    return new NumDateTimeFormatter(this.localeInfo);
  }

  getLocaleInfo() {
    return this.localeInfo || {};
  }

  getFormatters() {
    return this.measureFormatters || [];
  }

  getMeasureFormatter(index) {
    if (this.measureFormatters && this.measureFormatters[index]) {
      return this.measureFormatters[index];
    }
  }

  getCombinedMeasuresFormatter() {
    return this.combinedMeasuresFormatter;
  }

  formatMeasure(value, measureIndex) {
    const f = this.measureFormatters[measureIndex];
    if (f) {
      return f.format(value);
    }
    return value;
  }

  getFormatterFromFormatters(formatters) {
    let dateTimes = 0;
    let auto = 0;
    let min;
    let max;
    let range;
    let numeric = 0;

    const validFormatters = formatters
      ? formatters.filter((f) =>
          f.values ? !Number.isNaN(+f.values.range) : false,
        )
      : [];

    let combinedMeasuresFormatter;
    let form;

    if (formatters && formatters.length) {
      formatters.forEach((f) => {
        if (f.type === 'U' || (f.values && Number.isNaN(+f.values.range))) {
          auto++;
        } else if (['D', 'T', 'TS', 'IV'].includes(f.type)) {
          dateTimes = 1;
        } else {
          numeric = 1;
        }
        f.prepare();
        return f;
      });

      if (validFormatters.length) {
        min = validFormatters.reduce(
          (prev, f) => Math.min(f.values.min, prev),
          validFormatters[0].values.min,
        );
        max = validFormatters.reduce(
          (prev, f) => Math.max(f.values.max, prev),
          validFormatters[0].values.max,
        );
        range = Math.abs(max - min);
      }

      // find a decent combined formatter
      // 1) If all are of same type -> use that type, use details from first measure.
      // 2) If one type is combined with auto-> use that type, use details from first non-auto measure
      // 3) if mixed type, use auto
      if (dateTimes + numeric > 1) {
        // mixed type
        // interval and datetime formatters don't have decimal/thousand separator
        form = formatters.filter((nf) => nf.type !== 'datetime')[0] || {};
        combinedMeasuresFormatter = new NumDateTimeFormatter(
          this.localeInfo,
          form.pattern,
          form.thousandDelimiter,
          form.decimalDelimiter,
          'U',
        );
        if (!Number.isNaN(+range)) {
          combinedMeasuresFormatter.pattern = combinedMeasuresFormatter.createPatternFromRange(
            min,
            max,
            true,
          );
        }
      } else if (dateTimes + numeric === 1 && auto === 0) {
        // all of one type
        form = formatters[0] || {};
        combinedMeasuresFormatter = new NumDateTimeFormatter(
          this.localeInfo,
          form.pattern,
          form.thousandDelimiter,
          form.decimalDelimiter,
          form.type,
        );
      } else {
        // one type (that could be combined with auto)
        form = formatters.filter((nf) => nf.type !== 'U'); // get first non auto formatter
        form = form.length ? form[0] : formatters[0] || {};
        combinedMeasuresFormatter = new NumDateTimeFormatter(
          this.localeInfo,
          form.pattern,
          form.thousandDelimiter,
          form.decimalDelimiter,
          form.type,
        );
        if (!Number.isNaN(+range) && form.type === 'U') {
          combinedMeasuresFormatter.pattern = combinedMeasuresFormatter.createPatternFromRange(
            min,
            max,
            true,
          );
        }
      }

      combinedMeasuresFormatter.prepare();
    }
    if (!combinedMeasuresFormatter) {
      combinedMeasuresFormatter = new NumDateTimeFormatter(
        this.localeInfo,
        '0',
      );
    }

    return combinedMeasuresFormatter;
  }

  getFormattersForMeasures(measureInfo, indices) {
    let formatters = [];
    let measures;

    if (measureInfo && measureInfo.length) {
      measures = indices
        ? measureInfo.filter((m, idx) => indices.indexOf(idx) >= 0)
        : measureInfo;
      // formatting types
      // U: auto
      // I: integer
      // R: number
      // F: fixed to
      // M: money
      // D: date
      // T: time
      // TS: date and time
      // IV: interval
      formatters = measures.map(function (measure) {
        const shouldUseAuto = isAutoFormat(measure);
        const f = new NumDateTimeFormatter(
          this.localeInfo,
          measure.qNumFormat.qFmt,
          measure.qNumFormat.qThou,
          measure.qNumFormat.qDec,
          shouldUseAuto ? 'U' : measure.qNumFormat.qType,
        );
        const range = Math.abs(measure.qMax - measure.qMin);
        const isInvalid = Number.isNaN(+range);
        f.values = {
          min: measure.qMin,
          max: measure.qMax,
          range,
        };
        if (!isInvalid && shouldUseAuto) {
          f.pattern = f.createPatternFromRange(
            measure.qMin,
            measure.qMax,
            true,
          );
        }
        f.prepare();
        return f;
      }, this);
    }

    return formatters;
  }
}

export default ChartFormatting;
