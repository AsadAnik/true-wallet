import { ScrollView, TouchableOpacity, StyleSheet, View } from 'react-native';
import React from 'react';
import { CreditCard } from '@/components/widgets';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type CardDataType = {
    id: string;
    bank: string;
    number: string;
    type: 'visa' | 'mastercard' | 'amex';
    colors: string[];
    holder: string;
    expires: string;
}

type CardListPropsType = {
    cards: CardDataType[];
    selectedCards: string[];
    isSelectMode: boolean;
    onSelectCard: (id: string) => void;
}

// region CARD LIST
const CardList = ({ cards, selectedCards, isSelectMode, onSelectCard }: CardListPropsType) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
            {cards.map(card => {
                const isSelected = selectedCards.includes(card.id);
                return (
                    <TouchableOpacity
                        key={card.id}
                        onPress={() => onSelectCard(card.id)}
                        activeOpacity={0.8}
                        style={styles.cardWrapper}
                    >
                        <CreditCard
                            bank={card.bank}
                            number={card.number}
                            type={card.type}
                            colors={card.colors}
                            cardHolder={card.holder}
                            expires={card.expires}
                            style={styles.card}
                        />
                        {isSelectMode && (
                            <View style={styles.selectionOverlay}>
                                <View style={[styles.checkbox, isSelected && styles.checkedCheckbox]}>
                                    {isSelected && <FontAwesome name="check" size={14} color="#fff"/>}
                                </View>
                            </View>
                        )}
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

// region STYLE-SHEET
const styles = StyleSheet.create({
    container: {
        paddingBottom: 100, // Space for FAB or bottom actions
    },
    cardWrapper: {
        marginBottom: 20,
        alignItems: 'center',
        position: 'relative',
    },
    card: {
        width: '90%',
        height: 200,
    },
    selectionOverlay: {
        position: 'absolute',
        top: 20,
        right: '8%', // Align with card padding
        zIndex: 10,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#fff',
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkedCheckbox: {
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
    },
});

export default CardList;
