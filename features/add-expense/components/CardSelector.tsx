import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { CreditCard } from '@/components/widgets';
import { useTheme } from '@/context/ThemeContext';

const { width } = Dimensions.get('window');

const cards = [
    {
        key: 'card1',
        name: 'True Bank',
        number: '4242',
        type: 'visa',
        colors: ['#1A2980', '#26D0CE'],
        holder: 'Asad Anik',
        expires: '12/25'
    },
    {
        key: 'card2',
        name: 'Neo Bank',
        number: '8899',
        type: 'mastercard',
        colors: ['#FF512F', '#DD2476'],
        holder: 'Asad Anik',
        expires: '09/26'
    },
    {
        key: 'card3',
        name: 'Apex Bank',
        number: '1234',
        type: 'visa',
        colors: ['#42275a', '#734b6d'],
        holder: 'Asad Anik',
        expires: '01/28'
    },
];

interface CardSelectorProps {
    selectedCard: string | null;
    onSelect: (cardKey: string) => void;
}

// region CARD SELECTOR
const CardSelector = ({ selectedCard, onSelect }: CardSelectorProps) => {
    const { isDarkMode } = useTheme();
    const styles = useMemo(() => createStyles(isDarkMode), [isDarkMode]);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Select a Card to Use</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardsScroll}>
                {cards.map(card => {
                    const isSelected = selectedCard === card.key;
                    return (
                        <TouchableOpacity key={card.key} onPress={() => onSelect(card.key)} activeOpacity={0.8}>
                            <CreditCard
                                bank={card.name}
                                number={card.number}
                                type={card.type as any}
                                colors={card.colors}
                                cardHolder={card.holder}
                                expires={card.expires}
                                style={[styles.card, isSelected && styles.selectedCard]}
                            />
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

// region STYLE-SHEET
const createStyles = (isDarkMode: boolean) => StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: isDarkMode ? '#fff' : '#666',
        marginBottom: 15,
        paddingHorizontal: 20,
    },
    cardsScroll: {
        paddingHorizontal: 20,
    },
    card: {
        width: width * 0.8, // Adjusted width for better fit
        height: 200,
        marginRight: 16,
        borderWidth: 3,
        borderColor: 'transparent',
    },
    selectedCard: {
        borderColor: '#2196F3',
        shadowColor: '#2196F3',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
    },
});

export default CardSelector;
