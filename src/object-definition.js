/**
 * @namespace properties
 * @entry
 */
const objectDefinition = () => {
  /**
   * @lends properties
   */
  const definition = {
    /**
     * Current version of this generic object definition
     * @type {string}
     * @default
     */
    version: process.env.PACKAGE_VERSION,
    /**
     * Color settings.
     * Most color options for visualizations are set in the color object in the options. You activate custom coloring by setting `"auto": false` which turns off auto-coloring.
     * If `"auto": true`, no other properties need to be defined in the color object.
     * Note: Some of the color properties are depending on which theme is currently being used.
     * @type {object}
     */
    color: {
      /**
       * Set to use automatic coloring.
       * When `"auto": true`, color settings are based on the visualization used and the number of dimensions
       * and measures, that is, the settings are not fixed, but are dependent on the data input.
       * @type {boolean}
       * @default
       */
      auto: true,
      /**
       * Sets the coloring mode for the visualization when auto-coloring has been switched off (`"auto": false`). Can be one of:
       * * `primary`: a single color (by default blue) is used for all items in the chart. In visualizations that do not benefit from multiple colors (bar charts with one dimension and scatter plots), single color is the default setting.
       * * `byDimension`: coloring is based upon the amount of dimension values. Details are set in the `"byDimDef"` property.
       * !Note: `byDimension` can only be used in conjunction with an attribute dimension on the dimension to color by, as shown in the example below.
       * ```json
       * {
       *     "qDef": {
       *       "qFieldDefs": [
       *         "NetScoreName"
       *       ]
       *     },
       *     "qAttributeDimensions": [
       *       {
       *         "qDef": "NetScoreName",
       *         "id": "colorByAlternative",
       *         "label": "Year"
       *       }
       *     ]
       * }
       * ```
       * * `byExpression`: coloring is based on an expression, which in most cases is a color code. Details are set in the `"expressionIsColor"`, `"expressionLabel`" and `"colorExpression"` properties.
       * * `byMeasure`: coloring is based on the measure value. Details are set in the `"byMeasureDef"` property.
       * * `byMultiple`: can be used when more than one measure is used. By default, 12 colors are used for the dimensions. The colors are reused when there are more than 12 dimension values.
       * @type {'primary'|'byDimension'|'byExpression'|'byMeasure'|'byMultiple'}
       * @default "primary"
       */
      mode: 'primary',
      /**
       * Color by measure number formatting options
       */
      formatting: {
        /**
         * When enabled, the number format to use can be selected from multiple predefined formats based on the desired type (number, date).
         * @type {boolean=}
         * @default
         */
        numFormatFromTemplate: true,
      },
      /**
       * Use colors encoded in master items.
       * Only applicable when `"mode": "primary"` or `"mode": "byMultiple"` has been defined.
       * @type {'off'|'dimension'|'measure'}
       * @default "off"
       */
      useBaseColors: 'off',
      /**
       * The paletteColor object is used to define the color when you color by single color `("mode": "primary")`.
       * @type {paletteColor}
       * @default { index: 6 }
       */
      paletteColor: {
        index: 6,
      },
      /**
       * Set to true if you want to apply the colors defined for library dimensions when used.
       * Only applicable if `'colorMode': 'byDimension'`.
       * @type {boolean}
       * @default
       */
      useDimColVal: true,
      /**
       * Set to true if you want to apply the colors defined for library measures when used. Only applicable if `"mode": "byMeasure"`.
       * @type {boolean}
       * @default
       */
      useMeasureGradient: true,
      /**
       * Set to use persistent colors on data points between selections. Only applicable when using one dimension and when `"mode": "byDimension"` or when `"mode": "byMultiple"`.
       * @type {boolean}
       * @default
       */
      persistent: false,
      /**
       * Set to define whether the result of the expression is a valid CSS3 color.
       * Only applicable when `"mode": "byExpression"`.
       * @type {boolean}
       * @default
       */
      expressionIsColor: true,
      /**
       * Label to be defined on tool tips when using a coloring expression.
       * Only used if `'expressionIsColor': false`.
       * @type {string}
       * @default
       */
      expressionLabel: '',
      /**
       * Color scheme when `"mode": "byMeasure"`. Can be one of:
       * * `sg`: (sequential gradient) the transition between the different color groups is made using different shades of colors. High measure values have darker hues
       * * `sc`: (sequential classes) the transition between the different color groups is made using distinctly different colors.
       * * `dg`: (diverging gradient) used when working with data that is ordered from low to high, for instance, to show the relationship between different areas on a map. Low and high values have dark colors, mid-range colors are light.
       * * `dc`: (diverging classes) can be seen as two sequential classes combined, with the mid-range shared. The two extremes, high and low, are emphasized with dark colors with contrasting hues, and the mid-range critical values are emphasized with light colors.
       * @type {'sg'|'sc'|'dg'|'dc'}
       * @default "sg"
       */
      measureScheme: 'sg',
      /**
       * Set to reverse the color scheme.
       * @type {boolean}
       * @default
       */
      reverseScheme: false,
      /**
       * Color scheme when `"mode": "byDimension"` or `"mode": "byMultiple"` (`"12"` or `"100"` for most themes).
       * @type {'12'|'100'}
       * @default
       */
      dimensionScheme: '12',
      /**
       * Set to false to define custom color range. Custom color range is only applicable when coloring is by measure (`"mode": "byMeasure"`) or by expression (`"mode": "byExpression"`).
       * When coloring is by expression, `"expressionIsColor": "false"` must be set for custom color range to work.
       * @type {boolean}
       * @default
       */
      autoMinMax: true,
      /**
       * Set the min value for the color range.
       * Only applicable if `"autoMinMax": false`.
       * @type {number|ValueExpression=}
       * @default 0
       */
      measureMin: 0,
      /**
       * Set the max value for the color range.
       * Only applicable if `"autoMinMax": false`.
       * @type {number|ValueExpression=}
       * @default 10
       */
      measureMax: 10,
    },
    /**
     * Visualization footnote.
     * @type {(string|StringExpression)=}
     * @default
     */
    footnote: '',
    /**
     * Label mode settings.
     * @type {object}
     * @default
     */
    labels: {
      /**
       * Automatic label handling.
       * @type {boolean}
       * @default true
       */
      auto: true,
      /**
       * Show labels on headers.
       * @type {boolean}
       * @default true
       */
      headers: true,
      /**
       * Show overlay labels.
       * @type {boolean}
       * @default true
       */
      overlay: true,
      /**
       * Show labels on leafs.
       * @type {boolean}
       * @default true
       */
      leaves: true,
      /**
       * Show data point values.
       * @type {boolean}
       * @default false
       */
      values: false,
    },
    /**
     * Legend settings.
     * @type {object}
     */
    legend: {
      /**
       * Sets the legend position.
       * @type {'auto'|'right'|'left'|'bottom'|'top'}
       * @default "auto"
       */
      dock: 'auto',
      /**
       * Set to show the legend.
       * @type {boolean}
       * @default
       */
      show: false,
      /**
       * Show the legend title.
       * @type {boolean}
       * @default
       */
      showTitle: true,
    },
    /**
     * Extends `HyperCubeDef`, see Engine API: `HyperCubeDef`.
     * @extends {HyperCubeDef}
     */
    qHyperCubeDef: {
      /** @type {DimensionProperties[]} */
      qDimensions: [],
      /** @type {MeasureProperties[]} */
      qMeasures: [],

      qMode: 'K',
      qNoOfLeftDims: -1,
      qSortbyYValue: -1,
      qIndentMode: true, // needed for qSortbyYValue to work
      qShowTotalsAbove: true, // needed for qSortbyYValue to work
      qMaxStackedCells: 3000,
      qAlwaysFullyExpanded: true,
      qInitialDataFetch: [
        {
          qTop: 0,
          qHeight: 3000,
          qLeft: 0,
          qWidth: 30,
        },
      ],
      qSuppressZero: false, // Changed from true so that we can identify when 0 values exist and warn the user
      qSuppressMissing: true,
    },
    /**
     * Show visualization details toggle
     * @type {boolean=}
     * @default
     */
    showDetails: true,
    /**
     * Show visualization disclaimer toggle
     * @type {boolean}
     * @default
     */
    showDisclaimer: true,
    /**
     * Show title for the visualization.
     * @type {boolean=}
     * @default
     */
    showTitles: true,
    /**
     * Visualization subtitle.
     * @type {(string|StringExpression)=}
     * @default
     */
    subtitle: '',
    /**
     * Visualization title.
     * @type {(string|StringExpression)=}
     * @default
     */
    title: '',
    /**
     * Custom tooltip properties
     * @type {object}
     */
    tooltip: {
      /**
       * Toggle for using custom tooltip or regular tooltip
       * @type {boolean}
       * @default
       */
      auto: true,
      /**
       * Toggle for hiding basic information from custom tooltip
       * @type {boolean}
       * @default
       */
      hideBasic: false,
      /**
       * Custom tooltip title.
       * @type {(string|StringExpression)=}
       * @default
       */
      title: '',
      /**
       * Custom tooltip description.
       * @type {(string|StringExpression)=}
       * @default
       */
      description: '',
      /**
       * The chart object is used to define the chart displayed by the custom tooltip.
       * @type {MasterVisualizationChart}
       * @default undefined
       */
      chart: undefined,
      /**
       * The imageComponents objects are used to define the images displayed by the custom tooltip.
       * @type {ImageComponent[]}
       * @default undefined
       */
      imageComponents: undefined,
    },
  };

  return definition;
};

export default objectDefinition;

/**
 * Color information structure. Holds the actual color and index in palette.
 * @name paletteColor
 * @type object
 * @property {string} color - Color as hex string (mandatory if index: -1)
 * @property {number} index - Index in palette
 */

/**
 * Extends `NxDimension`, see Engine API: `NxDimension`.
 * @name DimensionProperties
 * @type object
 * @extends NxDimension
 * @property {AttributeDimensionProperties[]} qAttributeDimensions
 * @property {InlineDimensionDef} qDef
 */

/**
 * Extends `NxInlineDimensionDef`, see Engine API: `NxInlineDimensionDef`.
 * @name InlineDimensionDef
 * @type object
 * @extends NxInlineDimensionDef
 * @property {boolean=} autoSort Set to automatically sort the dimension.
 * @property {string=} cId ID used by the Qlik Sense. Must be unique within the current chart.
 * @property {string|StringExpression} othersLabel
 */

/**
 * Extends `NxMeasure`, see Engine API: `NxMeasure`.
 * @name MeasureProperties
 * @type object
 * @extends NxMeasure
 * @property {AttributeExpressionProperties[]} qAttributeExpressions
 * @property {InlineMeasureDef} qDef
 */

/**
 * Extends `NxInlineMeasureDef`, see Engine API: `NxInlineMeasureDef`.
 * @name InlineMeasureDef
 * @type object
 * @extends NxInlineMeasureDef
 * @property {boolean=} autoSort Set to automatically sort the measure.
 * @property {string=} cId ID used by the Qlik Sense. Must be unique within the current chart.
 * @property {boolean} isCustomFormatted Set to true to toggle off the default client formatting.
 * @property {boolean} numFormatFromTemplate=true When enabled, the number format to use can be selected from multiple predefined formats based on the desired type (number, date).
 * @property {string|StringExpression} othersLabel
 */

/**
 * Extends `NxAttrDimDef`, see Engine API: `NxAttrDimDef`.
 * @name AttributeDimensionProperties
 * @type object
 * @extends NxAttrDimDef
 * @property {string} id - One of: `colorByAlternative`: colors the chart using different dimensions (can be used together with color.mode="byDimension") or `colorByExpression` together with color.mode="byExpression".
 */

/**
 * @typedef {ColorAttributes|CustomTooltipAttributes} AttributeExpressionProperties
 */

/**
 * Extends `NxAttrExprDef`, see Engine API: `NxAttrExprDef`.
 * @name ColorAttributes
 * @type object
 * @extends NxAttrExprDef
 * @property {string} id - One of: `colorByAlternative`: colors the chart using different dimensions (can be used together with color.mode="byDimension") or `colorByExpression` together with color.mode="byExpression".
 */

/**
 * Extends `NxAttrExprDef`, see Engine API: `NxAttrExprDef`.
 * @name CustomTooltipAttributes
 * @type object
 * @extends NxAttrExprDef
 * @property {'customTooltipTitle' | 'customTooltipDescription' | 'customTooltipExpression'} id - Indicates how the attribute expression will be interpreted by the chart.
 * `customTooltipTitle`: additional title displayed on the custom tooltip
 * `customTooltipDescription`: description displayed on the custom tooltip
 * `customTooltipExpression`: measures displayed on the custom tooltip
 * @example
 * ```json
 * "qAttributeExpressions": [{
 *   "qExpression": "",
 *   "qLibraryId": "",
 *   "qAttribute": true,
 *   "qNumFormat": {
 *      "qType": "U",
 *      "qnDec": 10,
 *      "qUseThou": 0,
 *      "qFmt": "",
 *      "qDec": "",
 *      "qThou": "",
 *    }
 *   "qLabel": "custom title",
 *   "qLabelExpression": "",
 *   "id": "customTooltipTitle"
 * },
 * {
 *   "qExpression": "avg(population)",
 *   "qLibraryId": "",
 *   "qAttribute": true,
 *   "qNumFormat": {
 *      "qType": "U",
 *      "qnDec": 10,
 *      "qUseThou": 0,
 *      "qFmt": "",
 *      "qDec": "",
 *      "qThou": "",
 *    }
 *   "qLabel": "",
 *   "qLabelExpression": "",
 *   "id": "customTooltipDescription"
 * },
 * {
 *   "qExpression": "",
 *   "qLibraryId": "zpDNMcg",
 *   "qAttribute": true,
 *   "qNumFormat": {
 *      "qType": "U",
 *      "qnDec": 10,
 *      "qUseThou": 0,
 *      "qFmt": "",
 *      "qDec": "",
 *      "qThou": "",
 *    }
 *   "qLabel": "",
 *   "qLabelExpression": "",
 *   "id": "customTooltipExpression"
 * },
 * {
 *   "qExpression": "sum(population)",
 *   "qLibraryId": "",
 *   "qAttribute": true,
 *   "qNumFormat": {
 *      "qType": "M",
 *      "qnDec": 2,
 *      "qUseThou": 0,
 *      "qFmt": "$#,##0.00;-$#,##0.00",
 *      "qDec": ".",
 *      "qThou": ",",
 *    }
 *   "qLabel": "",
 *   "qLabelExpression": "=avg(population)",
 *   "id": "customTooltipExpression"
 * },
 * {
 *   "qExpression": "'https://my_url/'+sum(population)",
 *   "qLibraryId": "",
 *   "qAttribute": true,
 *   "qNumFormat": null,
 *   "qLabel": "",
 *   "qLabelExpression": "",
 *   "cId": "generatedUniqueId",
 *   "id": "customTooltipImages"
 * }]
 * ```
 */

/**
 * Chart component information structure.
 * @name MasterVisualizationChart
 * @type object
 * @property {MasterVisualizationChartStyle} style - Object containing the styles of the chart such as 'size'
 * @property {MasterVisualizationChartObject} object - Object containing the information fo the visualization, such as refId in case of master visualization
 */

/**
 * Chart component information structure.
 * @name MasterVisualizationChartStyle
 * @type object
 * @property {string} size - Input type as 'small' or 'medium' or 'large'
 */

/**
 * Chart component information structure.
 * @name MasterVisualizationChartObject
 * @type object
 * @property {string} refId - Input field containing the qExtendsId of the visualization, where qExtendsId is the unique id of the master visualization
 */

/**
 * Image component information structure.
 * @name ImageComponent
 * @type object
 * @property {string} type - Input type as 'url' or 'media library'
 * @property {string} size - Size as 'small','medium','large' or 'original'
 * @property {string} cId - Identifier of the image component - used as a link with an attribute expression
 * @property {string|StringExpression|MediaLibraryRef} ref - The reference value of the image
 */

/**
 * Media Library Reference structure.
 * @name MediaLibraryRef
 * @type object
 * @property {object} qStaticContentUrlDef - Media library structure
 */

/**
 * Media Library structure that will be evaluated by the engine.
 * @name qStaticContentUrlDef
 * @type object
 * @property {string} qUrl - Value of media library image
 */
