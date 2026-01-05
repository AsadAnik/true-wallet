import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { CategorySelector, CardSelector, CurrencySelector, IconPicker } from './';
import CalendarStrip from '@/components/ui/CalendarStrip';

interface ExpenseIncomeFormProps {
    type: 'expense' | 'income';
}

// region EXPENSE INCOME FORM
const ExpenseIncomeForm = ({ type }: ExpenseIncomeFormProps) => {
    const isExpense = type === 'expense';
    const buttonColor = isExpense ? '#F44336' : '#4CAF50';
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState({ code: 'BDT', symbol: '৳' });
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [expenseIcon, setExpenseIcon] = useState({ icon: 'shopping-cart', color: '#FF9800' });

    const isFormDisabled = isExpense && !selectedCard;

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {isExpense && (
                <CardSelector selectedCard={selectedCard} onSelect={setSelectedCard}/>
            )}

            <Text style={[styles.label, { paddingLeft: 20 }]}>Peek When</Text>
            <CalendarStrip selectedDate={selectedDate} onSelectDate={setSelectedDate}/>

            <View style={[isFormDisabled && styles.disabled]}>
                <View style={styles.amountContainer}>
                    <Text style={styles.label}>How much?</Text>
                    <View style={styles.amountInputRow}>
                        <CurrencySelector onSelect={setCurrency}/>
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
                            <Text style={styles.label}>Select Icon</Text>
                            <IconPicker onSelect={(icon, color) => setExpenseIcon({ icon, color })}/>

                            <Text style={[styles.label, { marginBottom: 0 }]}>What was this expense for?</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="What was this expense for?"
                                placeholderTextColor="#ccc"
                                editable={!isFormDisabled}
                            />
                        </>
                    ) : (
                        <>
                            <CardSelector selectedCard={selectedCard} onSelect={setSelectedCard}/>
                            <CategorySelector onSelect={(cat) => console.log(cat)}/>

                            <Text style={[styles.label, { marginBottom: 0 }]}>Where the income from?</Text>
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

// region STYLE-SHEET
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
