import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type CardProps = {
    bank: string;
    number: string;
    type: 'visa' | 'mastercard';
    colors: string[];
    isSelected: boolean;
    onSelect: () => void;
    isSelectMode: boolean;
};

const { width } = Dimensions.get('window');

// region CARD COMPONENT
const Card = ({ bank, number, type, colors, isSelected, onSelect, isSelectMode }: CardProps) => (
    <TouchableOpacity onPress={onSelect} activeOpacity={0.8}>
        <LinearGradient colors={colors as any} style={styles.card}>
            <View style={styles.cardTop}>
                <Text style={styles.cardBank}>{bank}</Text>
                <FontAwesome name={`cc-${type}`} size={24} color="#fff"/>
            </View>
            <Text style={styles.cardNumber}>**** **** **** {number}</Text>
            {isSelectMode && (
                <View style={styles.selectionIndicator}>
                    <FontAwesome name={isSelected ? 'check-square' : 'square-o'} size={24} color="#fff"/>
                </View>
            )}
        </LinearGradient>
    </TouchableOpacity>
);

// region STYLE-SHEET
const styles = StyleSheet.create({
    card: {
        width: width - 40,
        height: 200,
        borderRadius: 20,
        padding: 24,
        marginVertical: 10,
        alignSelf: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
        position: 'relative',
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
    selectionIndicator: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 5,
        padding: 5,
    }
});


export default Card;