import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CategorySelector, CardSelector } from './';

/**
 * @description A form component specifically for adding income.
 * It contains only the fields relevant to income, like the category and an optional note.
 * This follows the single-responsibility principle.
 */
const IncomeForm = () => {
    return (
        <View>
            {/* The CardSelector can be reused here if income needs to be assigned to a card */}
            <CardSelector selectedCard={null} onSelect={(key) => console.log('Card selected for income', key)}/>
            <CategorySelector onSelect={(cat) => console.log(cat)}/>
            <TextInput
                style={styles.input}
                placeholder="Add a note (optional)"
                placeholderTextColor="#ccc"
            />
            <TouchableOpacity style={[styles.button, { backgroundColor: '#4CAF50' }]}>
                <Text style={styles.buttonText}>Add Income</Text>
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

export default IncomeForm;
