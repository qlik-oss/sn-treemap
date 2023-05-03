export default () => ({
  instanceConfig: {
    context: {
      theme: 'senseish',
    },
  },
  genericObjects: [
    {
      getLayout() {
        return {
          qInfo: {
            qId: 'NjUmYRx',
            qType: 'treemap',
          },
          qMeta: {
            privileges: ['read', 'update', 'delete'],
          },
          qSelectionInfo: {},
          qHyperCube: {
            qSize: {
              qcx: 1,
              qcy: 4,
            },
            qDimensionInfo: [
              {
                qFallbackTitle: 'Region Name',
                qApprMaxGlyphCount: 9,
                qCardinal: 4,
                qSortIndicator: 'A',
                qGroupFallbackTitles: ['Region Name'],
                qGroupPos: 0,
                qStateCounts: {
                  qLocked: 0,
                  qSelected: 0,
                  qOption: 4,
                  qDeselected: 0,
                  qAlternative: 0,
                  qExcluded: 0,
                  qSelectedExcluded: 0,
                  qLockedExcluded: 0,
                },
                qTags: ['$ascii', '$text'],
                qDimensionType: 'D',
                qGrouping: 'N',
                qNumFormat: {
                  qType: 'U',
                  qnDec: 0,
                  qUseThou: 0,
                },
                qIsAutoFormat: true,
                qGroupFieldDefs: ['Region Name'],
                qMin: 'NaN',
                qMax: 'NaN',
                qAttrExprInfo: [
                  {
                    qMin: 3961974.1500000013,
                    qMax: 21598649.600000005,
                    qFallbackTitle: 'Sum([Actual Amount])',
                    qMinText: '3961974.15',
                    qMaxText: '21598649.6',
                    qNumFormat: {
                      qType: 'U',
                      qnDec: 0,
                      qUseThou: 0,
                    },
                    qIsAutoFormat: true,
                    id: 'colorByAlternative',
                    label: 'Sum([Actual Amount])',
                  },
                ],
                qAttrDimInfo: [],
                qCardinalities: {
                  qCardinal: 4,
                  qHypercubeCardinal: 4,
                  qAllValuesCardinal: -1,
                },
                autoSort: true,
                cId: 'JyFAfC',
                othersLabel: 'Others',
              },
            ],
            qMeasureInfo: [
              {
                qFallbackTitle: 'Sum([Actual Amount])',
                qApprMaxGlyphCount: 11,
                qCardinal: 0,
                qSortIndicator: 'D',
                qNumFormat: {
                  qType: 'U',
                  qnDec: 0,
                  qUseThou: 0,
                },
                qMin: 3961974.1500000013,
                qMax: 21598649.600000005,
                qIsAutoFormat: true,
                qAttrExprInfo: [],
                qAttrDimInfo: [],
                qTrendLines: [],
                autoSort: true,
                cId: 'NTeRjZ',
                numFormatFromTemplate: true,
              },
            ],
            qEffectiveInterColumnSortOrder: [0],
            qGrandTotalRow: [],
            qDataPages: [],
            qPivotDataPages: [],
            qStackedDataPages: [
              {
                qData: [
                  {
                    qElemNo: 0,
                    qValue: 0,
                    qType: 'R',
                    qMaxPos: 46258458.110000014,
                    qMinNeg: 0,
                    qUp: 0,
                    qDown: 0,
                    qRow: 0,
                    qSubNodes: [
                      {
                        qText: 'Central',
                        qElemNo: 3,
                        qValue: 'NaN',
                        qType: 'N',
                        qMaxPos: 21598649.600000005,
                        qMinNeg: 0,
                        qUp: 0,
                        qDown: 0,
                        qRow: 0,
                        qSubNodes: [
                          {
                            qText: '21598649.6',
                            qElemNo: 0,
                            qValue: 21598649.600000005,
                            qType: 'V',
                            qMaxPos: 0,
                            qMinNeg: 0,
                            qUp: 0,
                            qDown: 0,
                            qRow: 0,
                            qSubNodes: [],
                          },
                        ],
                        qAttrExps: {
                          qValues: [
                            {
                              qText: '21598649.6',
                              qNum: 21598649.600000005,
                            },
                          ],
                        },
                      },
                      {
                        qText: 'Western',
                        qElemNo: 0,
                        qValue: 'NaN',
                        qType: 'N',
                        qMaxPos: 11428356.01,
                        qMinNeg: 0,
                        qUp: 0,
                        qDown: 0,
                        qRow: 1,
                        qSubNodes: [
                          {
                            qText: '11428356.01',
                            qElemNo: 0,
                            qValue: 11428356.01,
                            qType: 'V',
                            qMaxPos: 0,
                            qMinNeg: 0,
                            qUp: 0,
                            qDown: 0,
                            qRow: 1,
                            qSubNodes: [],
                          },
                        ],
                        qAttrExps: {
                          qValues: [
                            {
                              qText: '11428356.01',
                              qNum: 11428356.01,
                            },
                          ],
                        },
                      },
                      {
                        qText: 'Southern',
                        qElemNo: 1,
                        qValue: 'NaN',
                        qType: 'N',
                        qMaxPos: 9269478.350000005,
                        qMinNeg: 0,
                        qUp: 0,
                        qDown: 0,
                        qRow: 2,
                        qSubNodes: [
                          {
                            qText: '9269478.35',
                            qElemNo: 0,
                            qValue: 9269478.350000005,
                            qType: 'V',
                            qMaxPos: 0,
                            qMinNeg: 0,
                            qUp: 0,
                            qDown: 0,
                            qRow: 2,
                            qSubNodes: [],
                          },
                        ],
                        qAttrExps: {
                          qValues: [
                            {
                              qText: '9269478.35',
                              qNum: 9269478.350000005,
                            },
                          ],
                        },
                      },
                      {
                        qText: 'Northeast',
                        qElemNo: 2,
                        qValue: 'NaN',
                        qType: 'N',
                        qMaxPos: 3961974.1500000013,
                        qMinNeg: 0,
                        qUp: 0,
                        qDown: 0,
                        qRow: 3,
                        qSubNodes: [
                          {
                            qText: '3961974.15',
                            qElemNo: 0,
                            qValue: 3961974.1500000013,
                            qType: 'V',
                            qMaxPos: 0,
                            qMinNeg: 0,
                            qUp: 0,
                            qDown: 0,
                            qRow: 3,
                            qSubNodes: [],
                          },
                        ],
                        qAttrExps: {
                          qValues: [
                            {
                              qText: '3961974.15',
                              qNum: 3961974.1500000013,
                            },
                          ],
                        },
                      },
                    ],
                  },
                ],
                qArea: {
                  qLeft: 0,
                  qTop: 0,
                  qWidth: 1,
                  qHeight: 4,
                },
              },
            ],
            qMode: 'K',
            qNoOfLeftDims: 1,
            qIndentMode: true,
            qTreeNodesOnDim: [],
            qColumnOrder: [],
          },
          script: '',
          showTitles: true,
          title: '',
          subtitle: '',
          footnote: '',
          disableNavMenu: false,
          showDetails: false,
          showDetailsExpression: false,
          showDisclaimer: true,
          labels: {
            auto: true,
            headers: true,
            overlay: true,
            leaves: true,
            values: false,
          },
          color: {
            auto: false,
            mode: 'byMeasure',
            formatting: {
              numFormatFromTemplate: true,
            },
            useBaseColors: 'off',
            paletteColor: {
              index: 6,
            },
            useDimColVal: true,
            useMeasureGradient: true,
            persistent: false,
            expressionIsColor: true,
            expressionLabel: '',
            measureScheme: 'sc',
            reverseScheme: false,
            dimensionScheme: '12',
            autoMinMax: true,
            measureMin: 0,
            measureMax: 10,
            altLabel: 'Sum([Actual Amount])',
            byMeasureDef: {
              label: 'Sum([Actual Amount])',
              key: 'Sum([Actual Amount])',
              type: 'expression',
            },
          },
          legend: {
            show: true,
            dock: 'left',
            showTitle: true,
          },
          tooltip: {
            auto: true,
            hideBasic: false,
            chart: {
              style: {
                size: 'medium',
              },
            },
            title: '',
            description: '',
          },
          visualization: 'treemap',
          version: '1.2.0',
          components: [
            {
              key: 'general',
              title: {
                main: {
                  color: {
                    index: -1,
                    color: '#e01139',
                  },
                },
                footer: {
                  color: {
                    index: -1,
                    color: '#e01139',
                  },
                },
                subTitle: {
                  color: {
                    index: -1,
                    color: '#e01139',
                  },
                },
              },
            },
            {
              key: 'branch',
              branch: {
                label: {
                  color: {
                    index: -1,
                    color: '#ff1631',
                  },
                  fontSize: '20px',
                  fontFamily: "Bradley Hand, cursive",
                },
              }
            },
            {
              key: 'bkgColor',
              branch: {
                backgroundColor: {
                  index: 10,
                  color: "#f93f17"
                },
              },
            },
            {
              key: 'leaf',
              leaf: {
                label: {
                  fontSize: '15px',
                  fontFamily: "Luminari, fantasy",
                },
              }
            },
            {
              key: 'legend',
              legend: {
                label: {
                  color: {index: 8, color: "#ffcf02"},
                  fontSize: '15px',
                  fontFamily: "Luminari, fantasy",
                },
                title: {
                  color: {index: 3, color: "#276e27"},
                  fontSize: '20px',
                  fontFamily: "Bradley Hand, cursive",
                },
              },
            },
          ],
        };
      },
      getEffectiveProperties: {},
      },
  ],
});
