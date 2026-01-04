import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import React from "react";

const { width } = Dimensions.get('window');

// Define the shape of a single data item for the bar chart
interface BarDataItem {
    value: number;
    label: string;
    frontColor?: string;
}

// The component now expects an array of these items as a prop
interface AnalyticsChartViewProps {
    barData: BarDataItem[];
}

const AnalyticsChartView = ({ barData }: AnalyticsChartViewProps) => {
    return (
        <View style={styles.chartSection}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Analytics</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAll}>Weekly</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.chartContainer}>
                <BarChart
                    data={barData}
                    barWidth={22}
                    noOfSections={3}
                    barBorderRadius={4}
                    frontColor="lightgray"
                    yAxisThickness={0}
                    xAxisThickness={0}
                    hideRules
                    height={150}
                    width={width - 80} // Adjust width based on padding
                    topLabelTextStyle={{ color: '#999', fontSize: 12 }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    chartSection: {
        backgroundColor: '#fff',
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
        color: '#333',
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
