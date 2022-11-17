/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */

import { onTakeSnapshot, useImperativeHandle, useElement } from '@nebula.js/stardust';
import getLegendScrollOffset from './util/legend-scroll-offset';
import attachSnapshotMeta from './util/attach-snapshot-meta';
const KEY = 'legend-cat';

export default function setupSnapshot({ chart, viewState, colorService }) {
  const element = useElement();
  onTakeSnapshot((layout) => {
    if (!chart || !viewState) {
      return undefined;
    }

    attachSnapshotMeta(layout, element);

    layout.snapshotData.content.chartData = {
      scrollOffset: viewState.get('scrollOffset'),
      zoom: viewState.get('zoom'),
      legendScrollOffset: getLegendScrollOffset(chart, KEY),
    };

    return colorService
      .getSnapshotData()
      .then((data) => {
        layout.snapshotData.content.chartData = {
          ...layout.snapshotData.content.chartData,
          ...data,
        };
      })
      .catch(() => {});
  });

  useImperativeHandle(
    () => ({
      getViewState() {
        if (!viewState || !chart) {
          return undefined;
        }
        return {
          scrollOffset: viewState.get('scrollOffset'),
          zoom: viewState.get('zoom'),
          legendScrollOffset: getLegendScrollOffset(chart, KEY),
        };
      },
    }),
    [viewState, chart]
  );
}
