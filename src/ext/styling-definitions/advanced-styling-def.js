import { fontResolver as createFontResolver } from 'qlik-chart-modules';

function advancedStylingDef(stylingPanelEnabled, translator, theme, flags) {
  const fontResolver = createFontResolver({
    theme,
    translator,
    flags,
    config: {
      id: 'object.treemap',
      paths: ['branch.label', 'leaf.label', 'legend.title', 'legend.label'],
    },
  });
  return {
    component: 'styling-panel',
    chartType: 'treemap',
    translation: 'LayerStyleEditor.component.styling',
    chartTitle: 'Object.Treemap',
    useBackground: stylingPanelEnabled,
    subtitle: 'LayerStyleEditor.component.styling',
    useGeneral: true,
    items: {
      branchLabelSection: {
        translation: 'properties.branch.label',
        component: 'panel-section',
        items: {
          branchLabelItems: {
            component: 'items',
            ref: 'components',
            key: 'branch',
            items: {
              fontFamilyItem: {
                component: 'dropdown',
                ref: 'branch.label.fontFamily',
                options: () => fontResolver.branch.label.fontFamily.getOptions(),
                defaultValue: () => fontResolver.branch.label.fontFamily.getDefaultValue(),
              },
              fontWrapperItem: {
                component: 'inline-wrapper',
                items: {
                  fontSizeItem: {
                    component: 'dropdown',
                    ref: 'branch.label.fontSize',
                    options: () => fontResolver.branch.label.fontSize.getOptions(),
                    defaultValue: () => fontResolver.branch.label.fontSize.getDefaultValue(),
                  },
                  fontColorItem: {
                    component: 'color-picker',
                    width: false,
                    ref: 'branch.label.color',
                    defaultValue: () => ({
                      color: theme.getStyle('object.treemap', 'branch.label', 'color'),
                    }),
                  },
                },
              },
            },
          },
        },
      },
      bgColorSection: {
        translation: 'properties.branch.backgroundColor',
        component: 'panel-section',
        items: {
          bgColorItem: {
            component: 'items',
            ref: 'components',
            key: 'bkgColor',
            items: {
              bgColorPicker: {
                component: 'color-picker',
                ref: 'branch.backgroundColor',
                width: false,
                label: translator.get('properties.colorMode.primary'),
                defaultValue: () => ({
                  color: theme.getStyle('object.treemap', 'branch', 'backgroundColor'),
                }),
              },
            },
          },
        },
      },
      leafLabelSection: {
        translation: 'properties.leaf.label',
        component: 'panel-section',
        items: {
          leafLabelItems: {
            component: 'items',
            ref: 'components',
            key: 'leaf',
            items: {
              fontFamilyItem: {
                component: 'dropdown',
                ref: 'leaf.label.fontFamily',
                options: () => fontResolver.leaf.label.fontFamily.getOptions(),
                defaultValue: () => fontResolver.leaf.label.fontFamily.getDefaultValue(),
              },
              fontSizeItem: {
                component: 'dropdown',
                ref: 'leaf.label.fontSize',
                options: () => fontResolver.leaf.label.fontSize.getOptions(),
                defaultValue: () => fontResolver.leaf.label.fontSize.getDefaultValue(),
              },
            },
          },
        },
      },
      legendTitleSection: {
        translation: 'properties.legend.title',
        component: 'panel-section',
        items: {
          legendTitlelItems: {
            component: 'items',
            ref: 'components',
            key: 'legend',
            items: {
              fontFamilyItem: {
                component: 'dropdown',
                ref: 'legend.title.fontFamily',
                options: () => fontResolver.legend.title.fontFamily.getOptions(),
                defaultValue: () => fontResolver.legend.title.fontFamily.getDefaultValue(),
              },
              fontWrapperItem: {
                component: 'inline-wrapper',
                items: {
                  fontSizeItem: {
                    component: 'dropdown',
                    ref: 'legend.title.fontSize',
                    options: () => fontResolver.legend.title.fontSize.getOptions(),
                    defaultValue: () => fontResolver.legend.title.fontSize.getDefaultValue(),
                  },
                  fontColorItem: {
                    component: 'color-picker',
                    width: false,
                    ref: 'legend.title.color',
                    defaultValue: () => ({
                      color: theme.getStyle('object.treemap', 'legend.title', 'color'),
                    }),
                  },
                },
              },
            },
          },
        },
      },
      legendLabelSection: {
        translation: 'properties.legend.label',
        component: 'panel-section',
        items: {
          legendLabelItems: {
            component: 'items',
            ref: 'components',
            key: 'legend',
            items: {
              fontFamilyItem: {
                component: 'dropdown',
                ref: 'legend.label.fontFamily',
                options: () => fontResolver.legend.label.fontFamily.getOptions(),
                defaultValue: () => fontResolver.legend.label.fontFamily.getDefaultValue(),
              },
              fontWrapperItem: {
                component: 'inline-wrapper',
                items: {
                  fontSizeItem: {
                    component: 'dropdown',
                    ref: 'legend.label.fontSize',
                    options: () => fontResolver.legend.label.fontSize.getOptions(),
                    defaultValue: () => fontResolver.legend.label.fontSize.getDefaultValue(),
                  },
                  fontColorItem: {
                    component: 'color-picker',
                    width: false,
                    ref: 'legend.label.color',
                    defaultValue: () => ({
                      color: theme.getStyle('object.treemap', 'legend.label', 'color'),
                    }),
                  },
                },
              },
            },
          },
        },
      },
    },
  };
}

export default advancedStylingDef;
