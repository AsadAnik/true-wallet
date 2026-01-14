import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useMemo } from 'react';
import TransactionItem from './components/TransactionItem';
import { useTheme } from '@/context/ThemeContext';
import { getDateString } from '@/utils/date.utils';

// DUMMY DATA
const transactions = [
    {
        id: '1',
        name: 'Grocery Shopping',
        date: getDateString(0),
        displayDate: 'Today, 10:30 AM',
        amount: '$45.00',
        type: 'expense',
        categoryIcon: 'shopping-cart',
        iconColor: '#FF9800',
        iconBgColor: '#FFF3E0'
    },
    {
        id: '2',
        name: 'Salary',
        date: getDateString(1),
        displayDate: 'Yesterday, 5:00 PM',
        amount: '$2,500.00',
        type: 'income',
        categoryIcon: 'money',
        iconColor: '#4CAF50',
        iconBgColor: '#E8F5E9'
    },
    {
        id: '3',
        name: 'Netflix Subscription',
        date: '2023-10-24',
        displayDate: 'Oct 24, 2023',
        amount: '$15.00',
        type: 'expense',
        categoryIcon: 'film',
        iconColor: '#E91E63',
        iconBgColor: '#FCE4EC'
    },
    {
        id: '4',
        name: 'Uber Ride',
        date: '2023-10-22',
        displayDate: 'Oct 22, 2023',
        amount: '$12.50',
        type: 'expense',
        categoryIcon: 'car',
        iconColor: '#9C27B0',
        iconBgColor: '#F3E5F5'
    },
    {
        id: '5',
        name: 'Freelance Work',
        date: '2023-10-20',
        displayDate: 'Oct 20, 2023',
        amount: '$300.00',
        type: 'income',
        categoryIcon: 'laptop',
        iconColor: '#00BCD4',
        iconBgColor: '#E0F7FA'
    },
    {
        id: '6',
        name: 'Coffee',
        date: getDateString(0),
        displayDate: 'Today, 8:00 AM',
        amount: '$5.00',
        type: 'expense',
        categoryIcon: 'coffee',
        iconColor: '#795548',
        iconBgColor: '#EFEBE9'
    },
];

interface TransactionListProps {
    selectedDate?: string; // YYYY-MM-DD
}

// region TRANSACTION LIST
const TransactionListView = ({ selectedDate }: TransactionListProps) => {
    const filteredTransactions = selectedDate
        ? transactions.filter(t => t.date.startsWith(selectedDate))
        : transactions;
    const { isDarkMode } = useTheme();
    const styles = useMemo(() => createStyles(isDarkMode), [isDarkMode]);

    // region MAIN-UI
    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 15
            }}>
                <Text style={styles.header}>
                    {selectedDate ? `Transactions` : 'Recent Transactions'}
                </Text>
                <TouchableOpacity onPress={() => console.log('See All')}>
                    <Text style={{ color: 'gray' }}>See All</Text>
                </TouchableOpacity>
            </View>

            {filteredTransactions.length > 0 ? (
                <View style={styles.listContent}>
                    {filteredTransactions.map((item) => (
                        <TransactionItem
                            key={item.id}
                            name={item.name}
                            date={item.displayDate}
                            amount={item.amount}
                            type={item.type as 'income' | 'expense'}
                            categoryIcon={item.categoryIcon}
                            iconColor={item.iconColor}
                            iconBgColor={item.iconBgColor}
                        />
                    ))}
                </View>
            ) : (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>No transactions found for this date.</Text>
                </View>
            )}
        </View>
    );
}

// region STYLE-SHEET
const createStyles = (isDarkMode: boolean) => StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        marginTop: 8,
        color: isDarkMode ? '#fff' : '#333',
    },
    listContent: {
        paddingBottom: 20,
    },
    emptyState: {
        padding: 20,
        alignItems: 'center',
    },
    emptyText: {
        color: '#999',
        fontStyle: 'italic',
    },
});

export default TransactionListView;