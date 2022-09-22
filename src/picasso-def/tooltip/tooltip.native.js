import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { breadCrumb } from './breadCrumb';

export const tooltip = ({ level, layout, formatter }) => ({
  type: 'floating',
  key: 'tooltip',
  level,
  dimensions: layout.qHyperCube.qDimensionInfo.length,
  content: (data, dataIndex) => ({
    data,
    display: () => {
      const { qHyperCube } = layout;
      const { qMeasureInfo } = qHyperCube;
      const result = breadCrumb({ data: data[dataIndex].data });
      const valueLabel = `${qMeasureInfo[0].qFallbackTitle}:`;
      const valueText = formatter[0].formatValue(data[dataIndex].data.value);
      return (
        <View style={{ maxWidth: 400 }}>
          {result.map((text, index) => (
            <Text key={`${text}.${index}`} style={styles.header} numberOfLines={3}>
              {text}
            </Text>
          ))}

          <View style={styles.valueLine}>
            <Text style={styles.value} numberOfLines={1}>
              {valueLabel}
            </Text>
            <Text style={styles.value} numberOfLines={1}>
              {valueText}
            </Text>
          </View>
        </View>
      );
    },
  }),
});

const styles = StyleSheet.create({
  header: {
    padding: 4,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  value: {
    padding: 4,
    color: 'white',
    fontSize: 12,
  },
  valueLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});
