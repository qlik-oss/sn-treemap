export default () => ({
  instanceConfig: {
    context: {
      theme: 'senseish',
      renderer: 'svg',
    },
    renderer: 'svg',
  },
  genericObjects: [
    {
      getLayout() {
        return {
          "qInfo": {
            "qId": "pvPGyz",
            "qType": "treemap"
          },
          "qMeta": {
            "privileges": [
              "read",
              "update",
              "delete"
            ]
          },
          "qSelectionInfo": {},
          "qHyperCube": {
            "qSize": {
              "qcx": 1,
              "qcy": 3
            },
            "qDimensionInfo": [
              {
                "qFallbackTitle": "Dim1",
                "qApprMaxGlyphCount": 1,
                "qCardinal": 3,
                "qSortIndicator": "A",
                "qGroupFallbackTitles": [
                  "Dim1"
                ],
                "qGroupPos": 0,
                "qStateCounts": {
                  "qLocked": 0,
                  "qSelected": 0,
                  "qOption": 3,
                  "qDeselected": 0,
                  "qAlternative": 0,
                  "qExcluded": 0,
                  "qSelectedExcluded": 0,
                  "qLockedExcluded": 0
                },
                "qTags": [
                  "$ascii",
                  "$text"
                ],
                "qDimensionType": "D",
                "qGrouping": "N",
                "qNumFormat": {
                  "qType": "U",
                  "qnDec": 0,
                  "qUseThou": 0
                },
                "qIsAutoFormat": true,
                "qGroupFieldDefs": [
                  "Dim1"
                ],
                "qMin": "NaN",
                "qMax": "NaN",
                "qAttrExprInfo": [
                  {
                    "qMin": 3,
                    "qMax": 3,
                    "qFallbackTitle": "=1+2",
                    "qMinText": "3",
                    "qMaxText": "3",
                    "qNumFormat": {
                      "qType": "R",
                      "qnDec": 0,
                      "qUseThou": 0,
                      "qFmt": "##############",
                      "qDec": ".",
                      "qThou": ","
                    },
                    "qIsAutoFormat": true,
                    "cId": "DLJXg",
                    "autoSort": true,
                    "id": "customTooltipExpression"
                  }
                ],
                "qAttrDimInfo": [],
                "qCardinalities": {
                  "qCardinal": 3,
                  "qHypercubeCardinal": 3,
                  "qAllValuesCardinal": -1
                },
                "autoSort": true,
                "cId": "HCvyPw",
                "othersLabel": "Others"
              }
            ],
            "qMeasureInfo": [
              {
                "qFallbackTitle": "Avg(Expression2)",
                "qApprMaxGlyphCount": 6,
                "qCardinal": 0,
                "qSortIndicator": "D",
                "qNumFormat": {
                  "qType": "F",
                  "qnDec": 4,
                  "qUseThou": 1,
                  "qFmt": "#,##0.0000",
                  "qDec": ".",
                  "qThou": ","
                },
                "qMin": 0.3340286054827175,
                "qMax": 2.054004854368932,
                "qIsAutoFormat": true,
                "qAttrExprInfo": [
                  {
                    "qMin": "NaN",
                    "qMax": "NaN",
                    "qFallbackTitle": "='green'",
                    "qNumFormat": {
                      "qType": "U",
                      "qnDec": 0,
                      "qUseThou": 0
                    },
                    "qIsAutoFormat": true,
                    "id": "colorByExpression"
                  }
                ],
                "qAttrDimInfo": [],
                "qTrendLines": [],
                "autoSort": true,
                "cId": "bGaLkv",
                "numFormatFromTemplate": true
              }
            ],
            "qEffectiveInterColumnSortOrder": [
              0
            ],
            "qGrandTotalRow": [],
            "qDataPages": [],
            "qPivotDataPages": [],
            "qStackedDataPages": [
              {
                "qData": [
                  {
                    "qElemNo": 0,
                    "qValue": 0,
                    "qType": "R",
                    "qMaxPos": 3.617424140855234,
                    "qMinNeg": 0,
                    "qUp": 0,
                    "qDown": 0,
                    "qRow": 0,
                    "qSubNodes": [
                      {
                        "qText": "C",
                        "qElemNo": 2,
                        "qValue": "NaN",
                        "qType": "N",
                        "qMaxPos": 2.054004854368932,
                        "qMinNeg": 0,
                        "qUp": 0,
                        "qDown": 0,
                        "qRow": 0,
                        "qSubNodes": [
                          {
                            "qText": "2.0540",
                            "qElemNo": 0,
                            "qValue": 2.054004854368932,
                            "qType": "V",
                            "qMaxPos": 0,
                            "qMinNeg": 0,
                            "qUp": 0,
                            "qDown": 0,
                            "qRow": 0,
                            "qSubNodes": [],
                            "qAttrExps": {
                              "qValues": [
                                {
                                  "qText": "green",
                                  "qNum": "NaN"
                                }
                              ]
                            }
                          }
                        ],
                        "qAttrExps": {
                          "qValues": [
                            {
                              "qText": "3",
                              "qNum": 3
                            }
                          ]
                        }
                      },
                      {
                        "qText": "B",
                        "qElemNo": 0,
                        "qValue": "NaN",
                        "qType": "N",
                        "qMaxPos": 1.2293906810035842,
                        "qMinNeg": 0,
                        "qUp": 0,
                        "qDown": 0,
                        "qRow": 1,
                        "qSubNodes": [
                          {
                            "qText": "1.2294",
                            "qElemNo": 0,
                            "qValue": 1.2293906810035842,
                            "qType": "V",
                            "qMaxPos": 0,
                            "qMinNeg": 0,
                            "qUp": 0,
                            "qDown": 0,
                            "qRow": 1,
                            "qSubNodes": [],
                            "qAttrExps": {
                              "qValues": [
                                {
                                  "qText": "green",
                                  "qNum": "NaN"
                                }
                              ]
                            }
                          }
                        ],
                        "qAttrExps": {
                          "qValues": [
                            {
                              "qText": "3",
                              "qNum": 3
                            }
                          ]
                        }
                      },
                      {
                        "qText": "A",
                        "qElemNo": 1,
                        "qValue": "NaN",
                        "qType": "N",
                        "qMaxPos": 0.3340286054827175,
                        "qMinNeg": 0,
                        "qUp": 0,
                        "qDown": 0,
                        "qRow": 2,
                        "qSubNodes": [
                          {
                            "qText": "0.3340",
                            "qElemNo": 0,
                            "qValue": 0.3340286054827175,
                            "qType": "V",
                            "qMaxPos": 0,
                            "qMinNeg": 0,
                            "qUp": 0,
                            "qDown": 0,
                            "qRow": 2,
                            "qSubNodes": [],
                            "qAttrExps": {
                              "qValues": [
                                {
                                  "qText": "green",
                                  "qNum": "NaN"
                                }
                              ]
                            }
                          }
                        ],
                        "qAttrExps": {
                          "qValues": [
                            {
                              "qText": "3",
                              "qNum": 3
                            }
                          ]
                        }
                      }
                    ]
                  }
                ],
                "qArea": {
                  "qLeft": 0,
                  "qTop": 0,
                  "qWidth": 1,
                  "qHeight": 3
                }
              }
            ],
            "qMode": "K",
            "qNoOfLeftDims": 1,
            "qIndentMode": true,
            "qTreeNodesOnDim": [],
            "qColumnOrder": []
          },
          "script": "",
          "showTitles": true,
          "title": "",
          "subtitle": "",
          "footnote": "",
          "disableNavMenu": false,
          "showDetails": true,
          "showDetailsExpression": false,
          "showDisclaimer": true,
          "labels": {
            "auto": true,
            "headers": true,
            "overlay": true,
            "leaves": true,
            "values": false
          },
          "color": {
            "auto": false,
            "mode": "byExpression",
            "formatting": {
              "numFormatFromTemplate": true
            },
            "useBaseColors": "off",
            "paletteColor": {
              "index": 6
            },
            "useDimColVal": true,
            "useMeasureGradient": true,
            "persistent": false,
            "expressionIsColor": true,
            "expressionLabel": "",
            "measureScheme": "sg",
            "reverseScheme": false,
            "dimensionScheme": "12",
            "autoMinMax": true,
            "measureMin": 0,
            "measureMax": 10,
            "colorExpression": "='green'"
          },
          "legend": {
            "show": false,
            "dock": "auto",
            "showTitle": true
          },
          "tooltip": {
            "auto": false,
            "hideBasic": true,
            "chart": {
              "style": {
                "size": "medium"
              }
            },
            "title": "",
            "description": ""
          },
          "visualization": "treemap",
          "version": "1.6.0"
        };
      },
      getEffectiveProperties: {},
    },
  ],
});
