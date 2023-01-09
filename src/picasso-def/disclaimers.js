function blockingComponent(disclaimerLabel, translator, rtl) {
  return {
    key: 'blocking-disclaimer',
    type: 'disclaimer',
    layout: {
      displayOrder: 1000,
      dock: 'center',
    },
    settings: {
      label: translator.get(`Object.Disclaimer.${disclaimerLabel}`),
      rtl,
    },
  };
}

function noDataExist(layout) {
  if (!layout?.qHyperCube) {
    return true;
  }
  const { qcx, qcy } = layout.qHyperCube.qSize;
  return qcx * qcy === 0;
}

function onlyNanData(layout) {
  return layout.qHyperCube.qMeasureInfo[0]?.qMin === 'NaN' && layout.qHyperCube.qMeasureInfo[0]?.qMax === 'NaN';
}

function onlyNegativeOrZeroValues(layout) {
  return layout.qHyperCube.qMeasureInfo[0]?.qMax <= 0;
}

export function getBlockingDisclaimer(layout, translator, rtl) {
  if (noDataExist(layout)) {
    return blockingComponent('NoDataExist', translator, rtl);
  }
  if (onlyNanData(layout)) {
    return blockingComponent('OnlyNanData', translator, rtl);
  }
  if (onlyNegativeOrZeroValues(layout)) {
    return blockingComponent('OnlyNegativeOrZeroValues', translator, rtl);
  }
  return null;
}

function negativeOrZeroValues(layout) {
  return layout.qHyperCube.qMeasureInfo[0]?.qMin <= 0;
}

function infoComponent(disclaimerLabel, translator, rtl) {
  return {
    key: 'info-disclaimer',
    type: 'disclaimer',
    layout: {
      displayOrder: 1000,
      dock: 'bottom',
    },
    settings: {
      label: translator.get(`Object.Disclaimer.${disclaimerLabel}`),
      rtl,
    },
  };
}

export function getInfoDisclaimer(layout, translator, rtl) {
  if (layout.showDisclaimer === false) {
    return undefined;
  }
  if (negativeOrZeroValues(layout)) {
    return infoComponent('NegativeOrZeroValues', translator, rtl);
  }
  return undefined;
}
