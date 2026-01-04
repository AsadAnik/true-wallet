import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// region BALANCE CARD
const BalanceCard = () => {
    return (
        <LinearGradient
            colors={['#517be5', '#7c74e1', '#ba6cc4', '#dd81a9', '#f58773']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
        >
            <Text style={styles.label}>Total Balance</Text>
            <Text style={styles.amount}>$12,345.00</Text>
            <View style={styles.row}>
                <View>
                    <Text style={styles.subLabel}>Income</Text>
                    <Text style={styles.income}>+$2,500.00</Text>
                </View>
                <View>
                    <Text style={styles.subLabel}>Expense</Text>
                    <Text style={styles.expense}>-$850.00</Text>
                </View>
            </View>
        </LinearGradient>
    );
}

// region STYLE-SHEET
const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        padding: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    label: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 14,
        marginBottom: 4,
    },
    amount: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    subLabel: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 12,
        marginBottom: 2,
    },
    income: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    expense: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default BalanceCard;