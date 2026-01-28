import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useMemo } from "react";
import { useTheme } from '@/context/ThemeContext';
import { BarChartWidget, BarDataItemType } from './components';

// The component now expects an array of these items as a prop
type AnalyticsChartViewProps = {
    barData: BarDataItemType[];
}

// region ANALYTICS CHART VIEW
const AnalyticsChartView = ({ barData }: AnalyticsChartViewProps) => {
    const { isDarkMode } = useTheme();
    const styles = useMemo(() => createStyles(isDarkMode), [isDarkMode]);

    return (
        <View style={styles.chartSection}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Analytics</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAll}>Weekly</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.chartContainer}>
               <BarChartWidget barData={barData} />
            </View>
        </View>
    );
};

// region STYLE-SHEET
const createStyles = (isDarkMode: boolean) => StyleSheet.create({
    chartSection: {
        backgroundColor: isDarkMode ? '#000' : '#fff',
        margin: 20,
        padding: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: isDarkMode ? '#fff' : '#333',
    },
    seeAll: {
        color: '#2196F3',
        fontWeight: '600',
    },
    chartContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AnalyticsChartView;
