import { StyleSheet, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useMemo } from "react";
import { useTheme } from '@/context/ThemeContext';

interface TotalBalanceHeadViewProps {
    balance: string;
    percentage: string;
    isPositive: boolean;
}

// region TOTAL BALANCE VIEW
const TotalBalanceHeadView = ({ balance, percentage, isPositive }: TotalBalanceHeadViewProps) => {
    const { isDarkMode } = useTheme();
    const styles = useMemo(() => createStyles(isDarkMode), [isDarkMode]);

    return (
        <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Text style={styles.balanceAmount}>{balance}</Text>
            <View style={styles.percentageContainer}>
                <View style={[styles.percentageBadge, { backgroundColor: isPositive ? (isDarkMode ? '#1e1e1e' : '#E8F5E9') : (isDarkMode ? '#330000' : '#FFEBEE') }]}>
                    <FontAwesome name={isPositive ? "arrow-up" : "arrow-down"} size={12} color={isPositive ? "#4CAF50" : "#F44336"}/>
                    <Text style={[styles.percentageText, { color: isPositive ? "#4CAF50" : "#F44336" }]}>{percentage}</Text>
                </View>
                <Text style={styles.percentageLabel}>vs last month</Text>
            </View>
        </View>
    )
};

// region STYLE-SHEET
const createStyles = (isDarkMode: boolean) => StyleSheet.create({
    balanceContainer: {
        padding: 20,
        alignItems: 'center',
    },
    balanceLabel: {
        fontSize: 16,
        color: isDarkMode ? '#999' : '#666',
        marginBottom: 8,
    },
    balanceAmount: {
        fontSize: 36,
        fontWeight: 'bold',
        color: isDarkMode ? '#fff' : '#333',
        marginBottom: 10,
    },
    percentageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    percentageBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 8,
    },
    percentageText: {
        fontWeight: 'bold',
        fontSize: 12,
        marginLeft: 4,
    },
    percentageLabel: {
        color: '#999',
        fontSize: 12,
    }
});


export default TotalBalanceHeadView;