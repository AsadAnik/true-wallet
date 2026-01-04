import { StyleSheet, Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface TransactionItemProps {
  name: string;
  date: string;
  amount: string;
  type: 'income' | 'expense';
  categoryIcon?: string;
  iconColor?: string;
  iconBgColor?: string;
}

export default function TransactionItem({
  name,
  date,
  amount,
  type,
  categoryIcon = 'shopping-bag',
  iconColor = '#333',
  iconBgColor = '#F5F5F5',
}: TransactionItemProps) {
  const isExpense = type === 'expense';
  const amountColor = isExpense ? '#F44336' : '#4CAF50';
  const amountPrefix = isExpense ? '-' : '+';

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
        <FontAwesome name={categoryIcon as any} size={20} color={iconColor} />
      </View>
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Text style={[styles.amount, { color: amountColor }]}>
        {amountPrefix}{amount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
