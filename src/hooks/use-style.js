export default function createStyleService({ layoutService, themeService, flags }) {
  const styles = themeService.getStyles();
  const isEnabled = flags.isEnabled('IM_3434_TREEMAP_STYLING');
  const overrides = (key) =>
    isEnabled ? layoutService.getLayoutValue('components', []).find((c) => c.key === key) : undefined;

  return {
    branch: {
      bkgColor: {
        getStyle: () => ({
          backgroundColor: overrides('bkgColor')?.branch?.backgroundColor?.color ?? styles.branch?.backgroundColor,
        }),
      },
      label: {
        getStyle: () => ({
          fontFamily: overrides('branch')?.branch?.label?.fontFamily ?? styles.branch?.label.fontFamily,
          fontSize: overrides('branch')?.branch?.label?.fontSize ?? styles.branch?.label.fontSize,
          color: overrides('branch')?.branch?.label?.color?.color ?? styles.branch?.label.color,
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
          fontFamily: overrides('legend')?.legend?.title?.fontFamily ?? styles.legend?.title.fontFamily,
          fontSize: overrides('legend')?.legend?.title?.fontSize ?? styles.legend?.title.fontSize,
          color: overrides('legend')?.legend?.title?.color?.color ?? styles.legend?.title.color,
        }),
      },
      label: {
        getStyle: () => ({
          fontFamily: overrides('legend')?.legend?.label?.fontFamily ?? styles.legend?.label.fontFamily,
          fontSize: overrides('legend')?.legend?.label?.fontSize ?? styles.legend?.label.fontSize,
          color: overrides('legend')?.legend?.label?.color?.color ?? styles.legend?.label.color,
        }),
      },
    },
  };
}
