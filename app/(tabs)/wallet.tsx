import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { TotalBalanceHeadView, CreditCardsView, AnalyticsChartView } from '@/features/wallet';

// Mock data for the chart
const barData = [
    { value: 50, label: 'Mon' },
    { value: 80, label: 'Tue' },
    { value: 45, label: 'Wed' },
    { value: 90, label: 'Thu', frontColor: '#2196F3' }, // Highlighted
    { value: 60, label: 'Fri' },
    { value: 75, label: 'Sat' },
    { value: 40, label: 'Sun' },
];

const WalletScreen = () => {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Total Balance Section */}
            <TotalBalanceHeadView />

            {/* Cards Carousel */}
            <CreditCardsView />

            {/* Analytics Chart Section */}
            <AnalyticsChartView barData={barData}  />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
});

export default WalletScreen;