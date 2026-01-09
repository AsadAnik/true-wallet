import React, { useState, useMemo } from 'react';
import { View, Text, Pressable, Modal, StyleSheet, Button, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '@/context/ThemeContext';

const currencies = [
    { label: 'BDT (৳)', value: 'BDT', symbol: '৳' },
    { label: 'USD ($)', value: 'USD', symbol: '$' },
    { label: 'EUR (€)', value: 'EUR', symbol: '€' },
    { label: 'JPY (¥)', value: 'JPY', symbol: '¥' },
    { label: 'GBP (£)', value: 'GBP', symbol: '£' },
    { label: 'CAD (C$)', value: 'CAD', symbol: 'C$' },
    { label: 'AUD (A$)', value: 'AUD', symbol: 'A$' },
    { label: 'INR (₹)', value: 'INR', symbol: '₹' },
];

interface CurrencySelectorProps {
    onSelect: (currency: { code: string; symbol: string }) => void;
}

// region CURRENCY SELECTOR
const CurrencySelector = ({ onSelect }: CurrencySelectorProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState('BDT'); // Set BDT as default
    const { isDarkMode } = useTheme();
    const styles = useMemo(() => createStyles(isDarkMode), [isDarkMode]);

    const handleValueChange = (itemValue: string) => {
        const currency = currencies.find(c => c.value === itemValue);
        if (currency) {
            setSelectedCurrency(itemValue);
            onSelect({ code: currency.value, symbol: currency.symbol });
        }
    };

    const selectedCurrencyObject = currencies.find(c => c.value === selectedCurrency);

    return (
        <>
            <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonText}>{selectedCurrencyObject?.label || 'Select Currency'}</Text>
                <FontAwesome name="chevron-down" size={12} color={isDarkMode ? '#999' : '#666'}/>
            </Pressable>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Picker
                            selectedValue={selectedCurrency}
                            onValueChange={handleValueChange}
                            style={styles.picker}
                            itemStyle={styles.pickerItem}
                            dropdownIconColor={isDarkMode ? '#fff' : '#000'}
                        >
                            {currencies.map(currency => (
                                <Picker.Item
                                    key={currency.value}
                                    label={currency.label}
                                    value={currency.value}
                                    color={Platform.OS === 'android' ? (isDarkMode ? '#fff' : '#333') : undefined}
                                />
                            ))}
                        </Picker>
                        <Button title="Done" onPress={() => setModalVisible(false)} color={isDarkMode ? '#2196F3' : '#2196F3'}/>
                    </View>
                </View>
            </Modal>
        </>
    );
};

// region STYLE-SHEET
const createStyles = (isDarkMode: boolean) => StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: isDarkMode ? '#1E1E1E' : '#f5f5f5',
        borderRadius: 10,
        padding: 15,
        height: 50,
    },
    buttonText: {
        fontSize: 16,
        color: isDarkMode ? '#fff' : '#000',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
    },
    modalContent: {
        backgroundColor: isDarkMode ? '#1E1E1E' : 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 10,
    },
    picker: {
        width: '100%',
        backgroundColor: isDarkMode ? '#1E1E1E' : 'white',
    },
    pickerItem: {
        color: isDarkMode ? '#fff' : '#000',
    },
});

export default CurrencySelector;
