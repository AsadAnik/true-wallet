import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import CardList from './components/CardList';
import { CardTemplateSelector, CardTemplatesType } from './components';
import { useRouter } from 'expo-router';

type InitialCardsType = {
    id: string;
    bank: string;
    number: string;
    type: 'visa' | 'mastercard';
    colors: string[];
    holder: string;
    expires: string;
};

type CardPickerViewPropsType = {
    initialCards: InitialCardsType[];
};

// region CARD PICKER VIEW
const CardPickerView = ({ initialCards }: CardPickerViewPropsType) => {
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

    const handleCreateCard = (template: CardTemplatesType) => {
        const newCard: InitialCardsType = {
            id: `new-${Date.now()}`,
            bank: 'New Bank',
            number: Math.floor(1000 + Math.random() * 9000).toString(),
            type: 'visa',
            colors: template.colors,
            holder: 'Asad Anik',
            expires: '12/28',
        };
        setCards(prev => [newCard, ...prev]);
        setShowTemplates(false);
    };

    // region Main UI
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

            <CardList
                cards={cards}
                selectedCards={selectedCards}
                isSelectMode={isSelectMode}
                onSelectCard={handleSelectCard}
            />

            {/* Action Buttons */}
            <View style={styles.footerActions}>
                {isSelectMode ? (
                    <TouchableOpacity
                        style={[styles.actionButton, styles.deleteButton]}
                        onPress={handleDelete}
                        disabled={selectedCards.length === 0}
                    >
                        <FontAwesome name="trash" size={20} color="#fff"/>
                        <Text style={styles.actionButtonText}>Delete ({selectedCards.length})</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={[styles.actionButton, styles.addButton]}
                                      onPress={() => setShowTemplates(true)}>
                        <FontAwesome name="plus" size={20} color="#fff"/>
                        <Text style={styles.actionButtonText}>Add New Card</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Templates Modal */}
            <Modal visible={showTemplates} animationType="slide" transparent={true}>
                <View style={styles.templatesOverlay}>
                    <View style={styles.templatesContainer}>
                        <CardTemplateSelector onSelect={handleCreateCard}/>
                        <TouchableOpacity style={styles.closeTemplatesButton} onPress={() => setShowTemplates(false)}>
                            <Text style={styles.closeTemplatesText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

// region STYLES-SHEET
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
    footerActions: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
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
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    templatesContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 40,
    },
    closeTemplatesButton: {
        marginTop: 10,
        alignSelf: 'center',
        padding: 10,
    },
    closeTemplatesText: {
        fontSize: 16,
        color: '#F44336',
        fontWeight: '600',
    },
});

export default CardPickerView;
