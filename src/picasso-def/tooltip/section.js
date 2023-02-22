const getLabel = (node, create) => {
  const labels = [];
  for (let data = node.data; data?.label; data = data.next) {
    labels.push(data.label);
  }
  return create.text({
    value: labels.join(', '),
    style: {
      bold: true,
    },
  });
};

const getColorData = (colorSettings, node) => {
  if (!colorSettings.fieldType) {
    return null;
  }
  for (let data = node.data; data; data = data.next) {
    if (colorSettings.field === data.source?.field) {
      return data;
    }
  }
  return null;
};

export const getSections = ({ layout, custom, chart, colorService }) => {
  const { qHyperCube } = layout;
  const { qMeasureInfo } = qHyperCube;
  const valueLabel = qMeasureInfo[0].qFallbackTitle;
  return ({ h, nodes, dataset, create }) => {
    const [node] = nodes;
    const section = [];

    const hideBasic = custom.hideBasic();

    if (node.data.depth !== layout.qHyperCube.qDimensionInfo.length) {
      section.push(getLabel(node, create));

      if (!hideBasic) {
        const colorSettings = colorService.getSettings();
        const colorData = getColorData(colorSettings, node);
        if (colorData) {
          const color = colorService.getColor()({ datum: colorData, resources: chart });

          section.push(
            create.color({
              nodes,
              property: 'fill',
              fillColor: color,
            })
          );
        }
      }

      return section;
    }

    const {
      title: customTitle,
      description: customDescription,
      measures: customMeasures,
    } = custom.isEnabled() ? custom.getAttributes({ dataset, nodes: [node] }) : {};

    if (customTitle) {
      section.push(
        create.text({
          value: customTitle,
          style: {
            bold: true,
          },
        })
      );
    }

    if (customDescription) {
      section.push(
        create.text({
          value: customDescription,
        })
      );
    }

    if (!hideBasic || customMeasures.length || (!customTitle && !customDescription)) {
      section.push(getLabel(node, create));
    }

    if (!hideBasic) {
      section.push(
        create.color({
          nodes,
          property: 'fill',
        })
      );

      const valueText = node.data.size.label;
      section.push(
        create.measure({
          label: valueLabel,
          value: valueText,
        })
      );
    }

    if (customMeasures) {
      section.push(
        ...customMeasures.map((m) =>
          create.measure({
            label: m.label,
            value: m.value,
            survive: {
              color: true,
              duplicate: true,
            },
          })
        )
      );
    }

    if (custom.chart.isEnabled()) {
      if (custom.chart.hasLimitation()) {
        custom.chart.destroy();
        section.push(
          create.raw({
            value: custom.chart.createLimitationRow(),
          })
        );
      } else {
        section.push(
          create.raw({
            value: custom.chart.createContainer({ h }),
          })
        );
      }
    }

    const { customTooltipImages: customImages } = node.data;

    if (custom.isEnabled() && customImages) {
      section.push(
        ...customImages.map((i) =>
          create.raw({
            value: custom.createImageRow({ value: i, h }),
          })
        )
      );
    }

    return section;
  };
};
