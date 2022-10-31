const LEGEND_CATEGORICAL = 'legend-cat';

export default function start({ setSelectionInfo, event, components, clear }) {
  const newComponents = components?.length ? components.map((c) => c.key).filter(Boolean) : [];

  setSelectionInfo({
    event,
    components: newComponents,

    // selections meta data
    legendRange: event === 'legendRange',
    legendTap: event === 'tap' && newComponents[0] === LEGEND_CATEGORICAL,
  });

  clear();
}
