import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export type CardTemplatesType = {
    id: string;
    name: string;
    colors: string[];
};

const cardTemplates: CardTemplatesType[] = [
    { id: 't1', name: 'Ocean Blue', colors: ['#1A2980', '#26D0CE'] },
    { id: 't2', name: 'Sunset Red', colors: ['#FF512F', '#DD2476'] },
    { id: 't3', name: 'Royal Purple', colors: ['#42275a', '#734b6d'] },
    { id: 't4', name: 'Forest Green', colors: ['#134E5E', '#71B280'] },
];

type CardTemplateSelectorPropsType = {
    onSelect: (template: { id: string; name: string; colors: string[] }) => void;
};

// region CARD TEMPLATE SELECTOR
const CardTemplateSelector = ({ onSelect }: CardTemplateSelectorPropsType) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose a Template</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {cardTemplates.map(template => (
                    <TouchableOpacity key={template.id} onPress={() => onSelect(template)}>
                        <LinearGradient colors={template.colors as any} style={styles.templateCard}>
                            <Text style={styles.templateName}>{template.name}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

// region STYLE-SHEET
const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
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
});

export default CardTemplateSelector;
