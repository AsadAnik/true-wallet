import { StyleSheet, Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useMemo } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface SummaryCardProps {
    type: 'Income' | 'Expense';
    amount: string;
}

// region SUMMARY CARD
const SummaryCard = ({ type, amount }: SummaryCardProps) => {
    const { isDarkMode } = useTheme();
    const styles = useMemo(() => createStyles(isDarkMode), [isDarkMode]);
    const isIncome = type === 'Income';
    const iconName = isIncome ? 'arrow-down' : 'arrow-up';
    const iconColor = isIncome ? '#4CAF50' : '#F44336';
    const iconBgStyle = isIncome ? styles.iconBgIncome : styles.iconBgExpense;

    return (
        <View style={styles.summaryCard}>
            <View style={iconBgStyle}>
                <FontAwesome name={iconName} size={20} color={iconColor}/>
            </View>
            <View>
                <Text style={styles.summaryLabel}>{type}</Text>
                <Text style={styles.summaryAmount}>{amount}</Text>
            </View>
        </View>
    );
};


// region SUMMARY VIEW
const DashboardSummaryView = () => {
    const { isDarkMode } = useTheme();
    const styles = useMemo(() => createStyles(isDarkMode), [isDarkMode]);

    return (
        <View style={styles.summaryContainer}>
            <SummaryCard type="Income" amount="$5,240.00"/>
            <SummaryCard type="Expense" amount="$1,350.00"/>
        </View>
    );
};

// region STYLE-SHEET
const createStyles = (isDarkMode: boolean) => StyleSheet.create({
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    summaryCard: {
        flex: 1,
        backgroundColor: isDarkMode ? '#000' : '#fff',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    iconBgIncome: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: isDarkMode ? '#1e1e1e' : '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    iconBgExpense: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: isDarkMode ? '#1e1e1e' : '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    summaryLabel: {
        fontSize: 12,
        color: isDarkMode ? '#fff' : '#999',
        marginBottom: 4,
    },
    summaryAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: isDarkMode ? '#E8F5E9' : '#333',
    },
});

export default DashboardSummaryView;
