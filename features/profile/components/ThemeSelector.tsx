import React, { useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '@/context/ThemeContext';

// region THEME SELECTOR
const ThemeSelector = () => {
    const { themePreference, setThemePreference, isDarkMode } = useTheme();
    const styles = useMemo(() => createStyles(isDarkMode), [isDarkMode]);

    const options: { label: string; value: 'light' | 'dark' | 'system'; icon: string }[] = [
        { label: 'Light', value: 'light', icon: 'sun-o' },
        { label: 'Dark', value: 'dark', icon: 'moon-o' },
        { label: 'System', value: 'system', icon: 'desktop' },
    ];

    return (
        <View style={styles.themeSelectorContainer}>
            {options.map((option) => {
                const isSelected = themePreference === option.value;
                const iconColor = isSelected ? (isDarkMode ? '#fff' : '#333') : (isDarkMode ? '#888' : '#666');
                return (
                    <TouchableOpacity
                        key={option.value}
                        style={[styles.themeOption, isSelected && styles.themeOptionSelected]}
                        onPress={() => setThemePreference(option.value)}
                    >
                        <FontAwesome name={option.icon as any} size={20} color={iconColor}/>
                        <Text style={[styles.themeOptionText, isSelected && styles.themeOptionTextSelected]}>
                            {option.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

// region STYLE-SHEET
const createStyles = (isDarkMode: boolean) => StyleSheet.create({
    themeSelectorContainer: {
        flexDirection: 'row',
        backgroundColor: isDarkMode ? '#1E1E1E' : '#f0f0f0',
        borderRadius: 16,
        padding: 8,
        marginBottom: 12,
    },
    themeOption: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 12,
    },
    themeOptionSelected: {
        backgroundColor: isDarkMode ? '#000' : '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    themeOptionText: {
        fontSize: 14,
        fontWeight: '500',
        color: isDarkMode ? '#888' : '#666',
        marginTop: 8,
    },
    themeOptionTextSelected: {
        color: isDarkMode ? '#fff' : '#333',
        fontWeight: 'bold',
    },
});

export default ThemeSelector;
