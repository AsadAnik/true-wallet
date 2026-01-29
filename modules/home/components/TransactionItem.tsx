import { StyleSheet, Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useMemo } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface TransactionItemProps {
  name: string;
  date: string;
  amount: string;
  type: 'income' | 'expense';
  categoryIcon?: string;
  iconColor?: string;
  iconBgColor?: string;
}

// region TRANSACTION ITEM
const TransactionItem = ({ name, date, amount, type, categoryIcon = 'shopping-bag', iconColor = '#333', iconBgColor = '#F5F5F5' }: TransactionItemProps) => {
  const isExpense = type === 'expense';
  const amountColor = isExpense ? '#F44336' : '#4CAF50';
  const amountPrefix = isExpense ? '-' : '+';
  const { isDarkMode } = useTheme();
  const styles = useMemo(() => createStyles(isDarkMode), [isDarkMode]);

  // In dark mode, we might want to darken the icon background or use a standard dark color
  // to prevent bright pastel boxes from clashing with the dark theme.
  // For now, let's use a slightly transparent version of the icon color or a standard dark gray if in dark mode.
  const finalIconBgColor = isDarkMode ? '#333' : iconBgColor;

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: finalIconBgColor }]}>
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

// region STYLE-SHEET
const createStyles = (isDarkMode: boolean) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDarkMode ? '#000' : '#fff', // Slightly lighter dark for cards
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: isDarkMode ? 0.3 : 0.03, // Stronger shadow in dark mode for depth
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
    color: isDarkMode ? '#fff' : '#333',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: isDarkMode ? '#AAA' : '#999',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TransactionItem;