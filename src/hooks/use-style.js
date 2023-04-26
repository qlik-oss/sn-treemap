export default function createStyleService({ layoutService, themeService, flags }) {
  const styles = themeService.getStyles();
  const isEnabled = flags.isEnabled('IM_3434_TREEMAP_STYLING');
  const overrides = (key) =>
    isEnabled ? layoutService.getLayoutValue('components', []).find((c) => c.key === key) : undefined;

  return {
    branch: {
      bkgColor: {
        getStyle: () => ({
          backgroundColor: overrides('bkgColor')?.branch?.backgroundColor ?? styles.branch?.backgroundColor,
        }),
      },
      label: {
        getStyle: () => ({
          fontFamily: overrides('branch')?.branch?.label?.fontFamily ?? styles.branch?.label.fontFamily,
          fontSize: overrides('branch')?.branch?.label?.fontSize ?? styles.branch?.label.fontSize,
          color: overrides('branch')?.branch?.label?.color ?? styles.branch?.label.color,
        }),
      },
    },
    leaf: {
      label: {
        getStyle: () => ({
          fontSize: overrides('leaf')?.leaf?.label?.fontSize ?? styles.leaf?.label.fontSize,
          fontFamily: overrides('leaf')?.leaf?.label?.fontFamily ?? styles.leaf?.label.fontFamily,
        }),
      },
    },
    legend: {
      title: {
        getStyle: () => ({
          fontSize: overrides('legend-title')?.legend?.title?.fontSize ?? styles.legend?.title.fontSize,
          fontFamily: overrides('legend-title')?.legend?.title?.fontFamily ?? styles.legend?.title.fontFamily,
          color: overrides('legend-title')?.legend?.title?.color.color ?? styles.legend?.title.color.color,
        }),
      },
      label: {
        getStyle: () => ({
          fontSize: overrides('legend-label')?.legend?.label?.fontSize ?? styles.legend?.label.fontSize,
          fontFamily: overrides('legend-label')?.legend?.label?.fontFamily ?? styles.legend?.label.fontFamily,
          color: overrides('legend-label')?.legend?.label?.color.color ?? styles.legend?.label.color.color,
        }),
      },
    },
  };
}
