import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { BalanceCard, TransactionList } from '@/features/home';
import CalendarStrip from '@/components/ui/CalendarStrip';
import { useTheme } from '@/context/ThemeContext';

const HomeScreen = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const { isDarkMode } = useTheme();
    const styles = useMemo(() => createStyles(isDarkMode), [isDarkMode]);

    // region MAIN-UI
    return (
        <View style={styles.container}>
            <CalendarStrip selectedDate={selectedDate} onSelectDate={setSelectedDate}/>

            {/* By removing `flex: 1`, the ScrollView will take up the remaining space */}
            {/* instead of competing with the CalendarStrip. */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <BalanceCard/>
                <TransactionList selectedDate={selectedDate}/>
            </ScrollView>
        </View>
    );
};

// region STYLE-SHEET
const createStyles = (isDarkMode: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? '#121212' : '#F8F9FA',
  },
  content: {
    // flex: 1, // This was causing the layout issue
    padding: 15,
  },
});

export default HomeScreen;
