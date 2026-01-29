import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { CreditCard } from '@/components/widgets';

export const cards = [
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
];

interface CreditCardsViewProps {
    selectedCardId: string;
    onSelectCard: (id: string) => void;
}

// region CREDIT CARDS VIEW
const CreditCardsView = ({ selectedCardId, onSelectCard }: CreditCardsViewProps) => {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardsScroll}>
            {cards.map(card => {
                const isSelected = selectedCardId === card.key;
                return (
                    <TouchableOpacity 
                        key={card.key} 
                        onPress={() => onSelectCard(card.key)}
                        activeOpacity={0.8}
                    >
                        <View style={[styles.cardContainer, isSelected && styles.selectedCard]}>
                            <CreditCard
                                bank={card.name}
                                number={card.number}
                                type={card.type as any}
                                colors={card.colors}
                                cardHolder={card.holder}
                                expires={card.expires}
                                style={styles.card}
                            />
                        </View>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

// region STYLE-SHEET
const styles = StyleSheet.create({
    cardsScroll: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    cardContainer: {
        marginRight: 16,
        borderRadius: 20,
    },
    selectedCard: {
        borderWidth: 3,
        borderColor: '#2196F3', // Highlight color for selected card
        shadowColor: '#2196F3',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
    },
    card: {
        // The margin is now handled by cardContainer
    },
});

export default CreditCardsView;
