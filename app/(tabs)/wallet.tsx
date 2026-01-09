import React, { useMemo } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { TotalBalanceHeadView, CreditCardsView, AnalyticsChartView } from '@/features/wallet';
import { useTheme } from '@/context/ThemeContext';

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

// region WALLET SCREEN
const WalletScreen = () => {
    const { isDarkMode } = useTheme();
    const styles = useMemo(() => createStyles(isDarkMode), [isDarkMode]);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Total Balance Section */}
            <TotalBalanceHeadView/>

            {/* Cards Carousel */}
            <CreditCardsView/>

            {/* Analytics Chart Section */}
            <AnalyticsChartView barData={barData}/>
        </ScrollView>
    );
}

// region STYLE-SHEET
const createStyles = (isDarkMode: boolean) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: isDarkMode ? '#121212' : '#F8F9FA',
    },
});

export default WalletScreen;