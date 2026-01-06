import React from 'react';
import { Pressable, StyleSheet, ScrollView } from 'react-native';

const colors = [
    '#FF9800', '#2196F3', '#9C27B0', '#E91E63', '#795548',
    '#4CAF50', '#F44336', '#00BCD4', '#607D8B',
];

interface ColorSelectorProps {
    selectedColor: string;
    onSelect: (color: string) => void;
}

// region COLOR SELECTOR
const ColorSelector = ({ selectedColor, onSelect }: ColorSelectorProps) => {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
            {colors.map(color => {
                const isSelected = selectedColor === color;
                return (
                    <Pressable
                        key={color}
                        style={[styles.colorCircle, { backgroundColor: color }, isSelected && styles.selectedCircle]}
                        onPress={() => onSelect(color)}
                    />
                );
            })}
        </ScrollView>
    );
};

// region STYLE-SHEET
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
    },
    colorCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 15,
    },
    selectedCircle: {
        borderWidth: 3,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
});

export default ColorSelector;
