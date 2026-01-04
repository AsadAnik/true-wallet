import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { CreditCard } from '@/components/widgets';

const cards = [
  { key: 'card1', name: 'True Bank', number: '4242', type: 'visa', colors: ['#1A2980', '#26D0CE'], holder: 'Asad Anik', expires: '12/25' },
  { key: 'card2', name: 'Neo Bank', number: '8899', type: 'mastercard', colors: ['#FF512F', '#DD2476'], holder: 'Asad Anik', expires: '09/26' },
];

const CreditCardsView = () => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardsScroll}>
      {cards.map(card => (
        <CreditCard
          key={card.key}
          bank={card.name}
          number={card.number}
          type={card.type as any}
          colors={card.colors}
          cardHolder={card.holder}
          expires={card.expires}
          style={styles.card}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardsScroll: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    marginRight: 16,
  },
});

export default CreditCardsView;
