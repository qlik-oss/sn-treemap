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
          "qInfo": {
            "qId": "yQZZHk",
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
          "qStateName": "Test",
          "qHyperCube": {
            "qStateName": "Test",
            "qSize": {
              "qcx": 1,
              "qcy": 6
            },
            "qDimensionInfo": [
              {
                "qFallbackTitle": "Dim2",
                "qApprMaxGlyphCount": 1,
                "qCardinal": 6,
                "qSortIndicator": "A",
                "qGroupFallbackTitles": [
                  "Dim2"
                ],
                "qGroupPos": 0,
                "qStateCounts": {
                  "qLocked": 0,
                  "qSelected": 0,
                  "qOption": 6,
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
                  "Dim2"
                ],
                "qMin": "NaN",
                "qMax": "NaN",
                "qAttrExprInfo": [],
                "qAttrDimInfo": [],
                "qCardinalities": {
                  "qCardinal": 6,
                  "qHypercubeCardinal": 6,
                  "qAllValuesCardinal": -1
                },
                "autoSort": true,
                "cId": "YQBJ",
                "othersLabel": "Others"
              }
            ],
            "qMeasureInfo": [
              {
                "qFallbackTitle": "Measure",
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
                "qMin": 0.13009592326139088,
                "qMax": 2.323832625833839,
                "qIsAutoFormat": true,
                "qAttrExprInfo": [],
                "qAttrDimInfo": [],
                "qTrendLines": [],
                "autoSort": true,
                "cId": "aCyNg",
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
                    "qMaxPos": 5.4855192920043185,
                    "qMinNeg": 0,
                    "qUp": 0,
                    "qDown": 0,
                    "qRow": 0,
                    "qSubNodes": [
                      {
                        "qText": "e",
                        "qElemNo": 0,
                        "qValue": "NaN",
                        "qType": "N",
                        "qMaxPos": "NaN",
                        "qMinNeg": 0,
                        "qUp": 0,
                        "qDown": 0,
                        "qRow": 0,
                        "qSubNodes": [
                          {
                            "qText": "-",
                            "qElemNo": 0,
                            "qValue": "NaN",
                            "qType": "U",
                            "qMaxPos": 0,
                            "qMinNeg": 0,
                            "qUp": 0,
                            "qDown": 0,
                            "qRow": 0,
                            "qSubNodes": []
                          }
                        ]
                      },
                      {
                        "qText": "f",
                        "qElemNo": 4,
                        "qValue": "NaN",
                        "qType": "N",
                        "qMaxPos": 2.323832625833839,
                        "qMinNeg": 0,
                        "qUp": 0,
                        "qDown": 0,
                        "qRow": 1,
                        "qSubNodes": [
                          {
                            "qText": "2.3238",
                            "qElemNo": 0,
                            "qValue": 2.323832625833839,
                            "qType": "V",
                            "qMaxPos": 0,
                            "qMinNeg": 0,
                            "qUp": 0,
                            "qDown": 0,
                            "qRow": 1,
                            "qSubNodes": []
                          }
                        ]
                      },
                      {
                        "qText": "d",
                        "qElemNo": 2,
                        "qValue": "NaN",
                        "qType": "N",
                        "qMaxPos": 1.4233490566037736,
                        "qMinNeg": 0,
                        "qUp": 0,
                        "qDown": 0,
                        "qRow": 2,
                        "qSubNodes": [
                          {
                            "qText": "1.4233",
                            "qElemNo": 0,
                            "qValue": 1.4233490566037736,
                            "qType": "V",
                            "qMaxPos": 0,
                            "qMinNeg": 0,
                            "qUp": 0,
                            "qDown": 0,
                            "qRow": 2,
                            "qSubNodes": []
                          }
                        ]
                      },
                      {
                        "qText": "c",
                        "qElemNo": 3,
                        "qValue": "NaN",
                        "qType": "N",
                        "qMaxPos": 1.0205223880597014,
                        "qMinNeg": 0,
                        "qUp": 0,
                        "qDown": 0,
                        "qRow": 3,
                        "qSubNodes": [
                          {
                            "qText": "1.0205",
                            "qElemNo": 0,
                            "qValue": 1.0205223880597014,
                            "qType": "V",
                            "qMaxPos": 0,
                            "qMinNeg": 0,
                            "qUp": 0,
                            "qDown": 0,
                            "qRow": 3,
                            "qSubNodes": []
                          }
                        ]
                      },
                      {
                        "qText": "b",
                        "qElemNo": 1,
                        "qValue": "NaN",
                        "qType": "N",
                        "qMaxPos": 0.5877192982456141,
                        "qMinNeg": 0,
                        "qUp": 0,
                        "qDown": 0,
                        "qRow": 4,
                        "qSubNodes": [
                          {
                            "qText": "0.5877",
                            "qElemNo": 0,
                            "qValue": 0.5877192982456141,
                            "qType": "V",
                            "qMaxPos": 0,
                            "qMinNeg": 0,
                            "qUp": 0,
                            "qDown": 0,
                            "qRow": 4,
                            "qSubNodes": []
                          }
                        ]
                      },
                      {
                        "qText": "a",
                        "qElemNo": 5,
                        "qValue": "NaN",
                        "qType": "N",
                        "qMaxPos": 0.13009592326139088,
                        "qMinNeg": 0,
                        "qUp": 0,
                        "qDown": 0,
                        "qRow": 5,
                        "qSubNodes": [
                          {
                            "qText": "0.1301",
                            "qElemNo": 0,
                            "qValue": 0.13009592326139088,
                            "qType": "V",
                            "qMaxPos": 0,
                            "qMinNeg": 0,
                            "qUp": 0,
                            "qDown": 0,
                            "qRow": 5,
                            "qSubNodes": []
                          }
                        ]
                      }
                    ]
                  }
                ],
                "qArea": {
                  "qLeft": 0,
                  "qTop": 0,
                  "qWidth": 1,
                  "qHeight": 6
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
          "showDetails": false,
          "showDetailsExpression": false,
          "showDisclaimer": true,
          "labels": {
            "auto": false,
            "headers": true,
            "overlay": true,
            "leaves": false,
            "values": false
          },
          "color": {
            "auto": true,
            "mode": "primary",
            "formatting": {
              "numFormatFromTemplate": true
            },
            "useBaseColors": "off",
            "paletteColor": {
              "index": 6
            },
            "useDimColVal": true,
            "useMeasureGradient": true,
            "persistent": true,
            "expressionIsColor": true,
            "expressionLabel": "",
            "measureScheme": "sg",
            "reverseScheme": false,
            "dimensionScheme": "12",
            "autoMinMax": true,
            "measureMin": 0,
            "measureMax": 10
          },
          "legend": {
            "show": false,
            "dock": "auto",
            "showTitle": true
          },
          "tooltip": {
            "auto": true,
            "hideBasic": false,
            "chart": {
              "style": {
                "size": "medium"
              }
            },
            "title": "",
            "description": ""
          },
          "visualization": "treemap",
          "version": "1.1.1"
        };
      },
      getEffectiveProperties: {},
    },
  ],
});
