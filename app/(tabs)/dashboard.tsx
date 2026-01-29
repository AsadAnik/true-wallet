import { StyleSheet, ScrollView } from 'react-native';
import { DashboardSummaryView, OverviewChartView, TopSpendingView } from '@/modules/dashboard';
import { useMemo } from 'react';
import { useTheme } from '@/context/ThemeContext';

// region DASHBOARD SCREEN
export default function DashboardScreen() {
    const { isDarkMode } = useTheme();
    const styles = useMemo(() => createStyles(isDarkMode), [isDarkMode]);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <DashboardSummaryView/>
            <OverviewChartView/>
            <TopSpendingView/>
        </ScrollView>
    );
}

// region STYLE-SHEET
const createStyles = (isDarkMode: boolean) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: isDarkMode ? '#121212' : '#F8F9FA',
        padding: 20,
    },
});
