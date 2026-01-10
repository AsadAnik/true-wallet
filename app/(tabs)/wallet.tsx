import React, { useMemo, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { TotalBalanceHeadView, CreditCardsView, AnalyticsChartView } from '@/features/wallet';
import { useTheme } from '@/context/ThemeContext';

// Mock data for different cards
const chartData = {
    card1: [
        { value: 50, label: 'Mon' },
        { value: 80, label: 'Tue' },
        { value: 45, label: 'Wed' },
        { value: 90, label: 'Thu', frontColor: '#2196F3' },
        { value: 60, label: 'Fri' },
        { value: 75, label: 'Sat' },
        { value: 40, label: 'Sun' },
    ],
    card2: [
        { value: 30, label: 'Mon' },
        { value: 45, label: 'Tue' },
        { value: 60, label: 'Wed', frontColor: '#FF512F' },
        { value: 20, label: 'Thu' },
        { value: 85, label: 'Fri' },
        { value: 50, label: 'Sat' },
        { value: 65, label: 'Sun' },
    ],
};

const balanceData = {
    card1: { balance: '$24,500.00', percentage: '+15%', isPositive: true },
    card2: { balance: '$12,850.00', percentage: '-5%', isPositive: false },
};

// region WALLET SCREEN
const WalletScreen = () => {
    const { isDarkMode } = useTheme();
    const styles = useMemo(() => createStyles(isDarkMode), [isDarkMode]);
    const [selectedCardId, setSelectedCardId] = useState('card1');

    const currentBarData = chartData[selectedCardId as keyof typeof chartData] || chartData.card1;
    const currentBalanceData = balanceData[selectedCardId as keyof typeof balanceData] || balanceData.card1;

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Total Balance Section */}
            <TotalBalanceHeadView 
                balance={currentBalanceData.balance}
                percentage={currentBalanceData.percentage}
                isPositive={currentBalanceData.isPositive}
            />

            {/* Cards Carousel */}
            <CreditCardsView 
                selectedCardId={selectedCardId} 
                onSelectCard={setSelectedCardId} 
            />

            {/* Analytics Chart Section */}
            <AnalyticsChartView barData={currentBarData} />
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