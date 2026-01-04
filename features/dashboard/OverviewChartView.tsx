import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

const OverviewChartView = () => {
    const pieData = [
        { value: 70, color: '#4CAF50', text: '70%' },
        { value: 30, color: '#F44336', text: '30%' },
    ];

    return (
        <View style={styles.chartSection}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <View style={styles.chartContainer}>
                <View style={{ alignItems: 'center' }}>
                    <PieChart
                        data={pieData}
                        donut
                        showGradient
                        sectionAutoFocus
                        radius={90}
                        innerRadius={60}
                        innerCircleColor={'#fff'}
                        centerLabelComponent={() => {
                            return (
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 22, color: '#333', fontWeight: 'bold' }}>$3.8k</Text>
                                    <Text style={{ fontSize: 14, color: '#999' }}>Balance</Text>
                                </View>
                            );
                        }}
                    />
                </View>
                <View style={styles.legendContainer}>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: '#4CAF50' }]}/>
                        <View>
                            <Text style={styles.legendLabel}>Income</Text>
                            <Text style={styles.legendValue}>70%</Text>
                        </View>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: '#F44336' }]}/>
                        <View>
                            <Text style={styles.legendLabel}>Expense</Text>
                            <Text style={styles.legendValue}>30%</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    chartSection: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    chartContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    legendContainer: {
        justifyContent: 'center',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    legendDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 10,
    },
    legendLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    legendValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default OverviewChartView;
