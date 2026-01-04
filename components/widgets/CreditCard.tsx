import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

interface CreditCardProps {
  bank: string;
  number: string;
  type: 'visa' | 'mastercard' | 'amex';
  colors: string[];
  cardHolder: string;
  expires: string;
  style?: object;
}

const CreditCard = ({ bank, number, type, colors, cardHolder, expires, style }: CreditCardProps) => {
  return (
    <LinearGradient colors={colors} style={[styles.card, style]}>
      <View style={styles.cardTop}>
        <Text style={styles.cardBank}>{bank}</Text>
        <FontAwesome name={`cc-${type}`} size={24} color="#fff" />
      </View>
      <Text style={styles.cardNumber}>**** **** **** {number}</Text>
      <View style={styles.cardBottom}>
        <View>
          <Text style={styles.cardLabel}>Card Holder</Text>
          <Text style={styles.cardValue}>{cardHolder}</Text>
        </View>
        <View>
          <Text style={styles.cardLabel}>Expires</Text>
          <Text style={styles.cardValue}>{expires}</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.85,
    height: 200,
    borderRadius: 20,
    padding: 24,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardBank: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardNumber: {
    color: '#fff',
    fontSize: 22,
    letterSpacing: 2,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    marginBottom: 4,
  },
  cardValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CreditCard;
