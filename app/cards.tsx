import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// Mock Data
const initialCards = [
    { id: '1', bank: 'True Bank', number: '4242', type: 'visa', colors: ['#1A2980', '#26D0CE'] },
    { id: '2', bank: 'Neo Bank', number: '8899', type: 'mastercard', colors: ['#FF512F', '#DD2476'] },
    { id: '3', bank: 'Apex Bank', number: '1234', type: 'visa', colors: ['#42275a', '#734b6d'] },
];

const cardTemplates = [
    { id: 't1', name: 'Ocean Blue', colors: ['#1A2980', '#26D0CE'] },
    { id: 't2', name: 'Sunset Red', colors: ['#FF512F', '#DD2476'] },
    { id: 't3', name: 'Royal Purple', colors: ['#42275a', '#734b6d'] },
    { id: 't4', name: 'Forest Green', colors: ['#134E5E', '#71B280'] },
];

// region CARDS SCREEN
export default function CardsScreen() {
    const router = useRouter();
    const [cards, setCards] = useState(initialCards);
    const [selectedCards, setSelectedCards] = useState<string[]>([]);
    const [isSelectMode, setIsSelectMode] = useState(false);
    const [showTemplates, setShowTemplates] = useState(false);

    const toggleSelectMode = () => {
        if (isSelectMode) {
            setSelectedCards([]);
        }
        setIsSelectMode(!isSelectMode);
    };

    const handleSelectCard = (cardId: string) => {
        if (!isSelectMode) return;
        setSelectedCards(prev =>
            prev.includes(cardId) ? prev.filter(id => id !== cardId) : [...prev, cardId]
        );
    };

    const handleDelete = () => {
        setCards(prev => prev.filter(card => !selectedCards.includes(card.id)));
        setSelectedCards([]);
        setIsSelectMode(false);
    };

    const handleCreateCard = (template: unknown) => {
        const newCard = {
            id: `new-${Date.now()}`,
            bank: 'New Bank',
            number: Math.floor(1000 + Math.random() * 9000).toString(),
            type: 'visa',
            colors: template.colors,
        };
        setCards(prev => [newCard, ...prev]);
        setShowTemplates(false);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <FontAwesome name="angle-left" size={30} color="#333"/>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Cards</Text>
                <TouchableOpacity onPress={toggleSelectMode}>
                    <Text style={styles.headerAction}>{isSelectMode ? 'Cancel' : 'Select'}</Text>
                </TouchableOpacity>
            </View>

            {/* Card List */}
            <ScrollView showsVerticalScrollIndicator={false}>
                {cards.map(card => (
                    <Card
                        key={card.id}
                        {...card}
                        isSelected={selectedCards.includes(card.id)}
                        onSelect={() => handleSelectCard(card.id)}
                        isSelectMode={isSelectMode}
                    />
                ))}
            </ScrollView>

            {/* Action Buttons */}
            {isSelectMode ? (
                <View style={styles.footerActions}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.deleteButton]}
                        onPress={handleDelete}
                        disabled={selectedCards.length === 0}
                    >
                        <FontAwesome name="trash" size={20} color="#fff"/>
                        <Text style={styles.actionButtonText}>Delete ({selectedCards.length})</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.footerActions}>
                    <TouchableOpacity style={[styles.actionButton, styles.addButton]}
                                      onPress={() => setShowTemplates(true)}>
                        <FontAwesome name="plus" size={20} color="#fff"/>
                        <Text style={styles.actionButtonText}>Add New Card</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Templates Modal (Simplified) */}
            {showTemplates && (
                <View style={styles.templatesOverlay}>
                    <View style={styles.templatesContainer}>
                        <Text style={styles.templatesTitle}>Choose a Template</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {cardTemplates.map(template => (
                                <TouchableOpacity key={template.id} onPress={() => handleCreateCard(template)}>
                                    <LinearGradient colors={template.colors} style={styles.templateCard}>
                                        <Text style={styles.templateName}>{template.name}</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <TouchableOpacity style={styles.closeTemplatesButton} onPress={() => setShowTemplates(false)}>
                            <Text style={styles.closeTemplatesText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
}

// region STYLE-SHEET
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50,
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    headerAction: {
        fontSize: 16,
        color: '#2196F3',
        fontWeight: '600',
    },
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
    },
    footerActions: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: '#fff',
    },
    actionButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 15,
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    addButton: {
        backgroundColor: '#2196F3',
    },
    deleteButton: {
        backgroundColor: '#F44336',
    },
    templatesOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'flex-end',
    },
    templatesContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: 40,
    },
    templatesTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    templateCard: {
        width: 120,
        height: 80,
        borderRadius: 10,
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    templateName: {
        color: '#fff',
        fontWeight: '600',
    },
    closeTemplatesButton: {
        marginTop: 20,
        alignSelf: 'center',
    },
    closeTemplatesText: {
        fontSize: 16,
        color: '#F44336',
        fontWeight: '600',
    },
});
