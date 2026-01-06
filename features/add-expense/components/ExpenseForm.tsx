import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { IconPicker } from './';

/**
 * @description A form component for the details of an expense, shown *after* a card is selected.
 */
const ExpenseForm = () => {
    const [expenseIcon, setExpenseIcon] = useState({ icon: 'shopping-cart', color: '#FF9800' });

    return (
        <View>
            <IconPicker onSelect={(icon, color) => setExpenseIcon({ icon, color })}/>
            <TextInput
                style={styles.input}
                placeholder="What was this expense for?"
                placeholderTextColor="#ccc"
            />
            <TouchableOpacity style={[styles.button, { backgroundColor: '#F44336' }]}>
                <Text style={styles.buttonText}>Add Expense</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
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

export default ExpenseForm;
