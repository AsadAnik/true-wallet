import React, { useState, useMemo } from 'react';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { AddExpenseTabs, ExpenseIncomeForm } from '@/features/add-expense';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '@/context/ThemeContext';

// region ADD EXPENSE
const AddExpenseScreen = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'expense' | 'income'>('expense');
    const { isDarkMode } = useTheme();
    const styles = useMemo(() => createStyles(isDarkMode), [isDarkMode]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
                    <FontAwesome name="close" size={24} color={isDarkMode ? '#fff' : '#333'}/>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add Transaction</Text>
            </View>

            <AddExpenseTabs activeTab={activeTab} onTabChange={setActiveTab}/>
            <ExpenseIncomeForm type={activeTab}/>
        </SafeAreaView>
    );
}

// region STYLE-SHEET
const createStyles = (isDarkMode: boolean) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: isDarkMode ? '#121212' : '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        paddingTop: 30,
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        left: 20,
        top: 30,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: isDarkMode ? '#fff' : '#333',
    },
});

export default AddExpenseScreen;