import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { CategorySelector, CardSelector, CurrencySelector } from './';

interface ExpenseIncomeFormProps {
  type: 'expense' | 'income';
}

const ExpenseIncomeForm = ({ type }: ExpenseIncomeFormProps) => {
  const isExpense = type === 'expense';
  const buttonColor = isExpense ? '#F44336' : '#4CAF50';
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState({ code: 'BDT', symbol: '৳' });
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const isFormDisabled = isExpense && !selectedCard;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {isExpense && (
        <CardSelector selectedCard={selectedCard} onSelect={setSelectedCard} />
      )}

      <View style={[isFormDisabled && styles.disabled]}>
        <View style={styles.amountContainer}>
          <Text style={styles.label}>How much?</Text>
          <View style={styles.amountInputRow}>
            <CurrencySelector onSelect={setCurrency} />
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              keyboardType="numeric"
              placeholderTextColor="#ccc"
              value={amount}
              onChangeText={setAmount}
              editable={!isFormDisabled}
            />
          </View>
        </View>

        <View style={styles.detailsContainer}>
          {isExpense ? (
            <>
              <CategorySelector onSelect={(cat) => console.log(cat)} />
              <TextInput
                style={styles.input}
                placeholder="What was this expense for?"
                placeholderTextColor="#ccc"
                editable={!isFormDisabled}
              />
            </>
          ) : (
            <>
              {/* For income, we might have a different card selector or none */}
              <CategorySelector onSelect={(cat) => console.log(cat)} />
              <TextInput
                style={styles.input}
                placeholder="Add a note (optional)"
                placeholderTextColor="#ccc"
              />
            </>
          )}
          
          <TouchableOpacity
            style={[styles.button, { backgroundColor: buttonColor }]}
            disabled={isFormDisabled}
          >
            <Text style={styles.buttonText}>Add {isExpense ? 'Expense' : 'Income'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  disabled: {
    opacity: 0.4,
  },
  amountContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 10,
  },
  amountInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amountInput: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'right',
    flex: 1,
    paddingLeft: 20,
  },
  detailsContainer: {
    padding: 20,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    marginTop: 20,
  },
  button: {
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ExpenseIncomeForm;
