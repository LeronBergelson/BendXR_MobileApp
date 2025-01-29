import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart as RNLineChart } from 'react-native-chart-kit';

interface LineChartData {
  labels: string[];
  datasets: { data: number[] }[];
}

interface LineChartProps {
  data: LineChartData;
  chartConfig?: any;
  color?: string;
  bezier?: boolean;
  formatYLabel?: (value: string) => string;
}

const screenWidth = Dimensions.get('window').width;

const defaultChartConfig = {
  backgroundGradientFrom: '#000000',
  backgroundGradientTo: '#000000',
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 2,
  decimalPlaces: 2,
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
  propsForLabels: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  propsForBackgroundLines: {
    strokeDasharray: '',
    strokeWidth: 1,
    stroke: 'rgba(255, 255, 255, 0.1)',
  },
};

const LineChart: React.FC<LineChartProps> = ({
  data,
  chartConfig = defaultChartConfig,
  color = 'rgba(255, 255, 255, 1)',
  bezier = false,
  formatYLabel,
}) => {
  const customizedChartConfig = {
    ...chartConfig,
    color: (opacity = 1) => color.replace('1)', `${opacity})`),
  };

  return (
    <RNLineChart
      data={data}
      width={screenWidth - 30}
      height={220}
      chartConfig={customizedChartConfig}
      bezier={bezier}
      formatYLabel={formatYLabel}
    />
  );
};

export default LineChart;
