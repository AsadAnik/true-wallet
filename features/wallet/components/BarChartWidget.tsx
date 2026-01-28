import { Dimensions } from 'react-native';
import React from 'react';
import { BarChart } from "react-native-gifted-charts";
import { useTheme } from '@/context/ThemeContext';

export type BarDataItemType = {
    value: number;
    label: string;
    frontColor?: string;
}

type BarChartPropsType = {
    barData: BarDataItemType[];
}

// region BAR-CHART WIDGET
const BarChartWidget = ({ barData }: BarChartPropsType) => {
    const { isDarkMode } = useTheme();
    const { width } = Dimensions.get('window');

    return (
        <BarChart
            data={barData}
            barWidth={22}
            noOfSections={3}
            barBorderRadius={4}
            frontColor={isDarkMode ? '#555' : 'lightgray'}
            yAxisThickness={0}
            xAxisThickness={0}
            hideRules
            height={150}
            width={width - 80} // Adjust width based on padding
            topLabelTextStyle={{ color: isDarkMode ? '#999' : '#999', fontSize: 12 }}
            yAxisTextStyle={{ color: isDarkMode ? '#999' : '#999' }}
        />
    );
};

export default BarChartWidget;