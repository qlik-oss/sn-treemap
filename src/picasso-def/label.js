export default function getLabel({ dataset, minor }) {
  const field = dataset.field(minor);
  const raw = field.raw();
  const useFormatter = !raw.isCustomFormatted && (raw.qIsAutoFormat || raw.qNumFormat.qType === 'U');

  if (!useFormatter) {
    return function getText(cell) {
      return cell.qText;
    };
  }

  const formatter = field.formatter();

  return function getFormattedLabel(cell) {
    const { qValue } = cell;

    if (qValue !== undefined && qValue !== 'NaN') {
      return formatter(qValue);
    }

    return '-';
  };
}
