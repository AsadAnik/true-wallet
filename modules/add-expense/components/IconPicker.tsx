import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput, ScrollView, FlatList } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ColorSelector from './ColorSelector';
import { useTheme } from '@/context/ThemeContext';

// A curated list of FontAwesome icons
const iconNames = [
    'shopping-cart', 'cutlery', 'car', 'plane', 'home', 'film', 'gamepad', 'book', 'briefcase',
    'medkit', 'heart', 'star', 'music', 'coffee', 'gift', 'train', 'bus', 'ship', 'motorcycle',
    'bicycle', 'building', 'paw', 'futbol-o', 'paint-brush', 'wrench', 'camera', 'phone',
];

interface IconPickerProps {
    onSelect: (icon: string, color: string) => void;
}

// region ICON PICKER
const IconPicker = ({ onSelect }: IconPickerProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState('shopping-cart');
    const [selectedColor, setSelectedColor] = useState('#FF9800');
    const [searchTerm, setSearchTerm] = useState('');
    const { isDarkMode } = useTheme();
    const styles = useMemo(() => createStyles(isDarkMode), [isDarkMode]);

    const filteredIcons = useMemo(() => {
        return iconNames.filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [searchTerm]);

    const handleSelect = () => {
        onSelect(selectedIcon, selectedColor);
        setModalVisible(false);
    };

    return (
        <>
            <TouchableOpacity style={styles.pickerButton} onPress={() => setModalVisible(true)}>
                <View style={[styles.iconPreview, { backgroundColor: selectedColor }]}>
                    <FontAwesome name={selectedIcon as any} size={30} color="#fff"/>
                </View>
                <Text style={styles.pickerButtonText}>Choose Icon</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Select an Icon</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <FontAwesome name="close" size={24} color={isDarkMode ? '#fff' : '#333'}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.previewSection}>
                        <View style={[styles.largeIconPreview, { backgroundColor: selectedColor }]}>
                            <FontAwesome name={selectedIcon as any} size={50} color="#fff"/>
                        </View>
                    </View>

                    <ColorSelector selectedColor={selectedColor} onSelect={setSelectedColor}/>

                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for an icon..."
                        placeholderTextColor={isDarkMode ? '#999' : '#999'}
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                    />

                    <FlatList
                        data={filteredIcons}
                        keyExtractor={item => item}
                        numColumns={5}
                        contentContainerStyle={styles.iconGrid}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.iconWrapper} onPress={() => setSelectedIcon(item)}>
                                <FontAwesome name={item as any} size={30} color={isDarkMode ? '#fff' : '#333'}/>
                            </TouchableOpacity>
                        )}
                    />

                    <TouchableOpacity style={styles.selectButton} onPress={handleSelect}>
                        <Text style={styles.selectButtonText}>Select</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </>
    );
};

// region STYLE-SHEET
const createStyles = (isDarkMode: boolean) => StyleSheet.create({
    pickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: isDarkMode ? '#1E1E1E' : '#f5f5f5',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
    },
    iconPreview: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    pickerButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: isDarkMode ? '#fff' : '#000',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: isDarkMode ? '#121212' : '#fff',
        paddingTop: 60,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: isDarkMode ? '#fff' : '#000',
    },
    previewSection: {
        alignItems: 'center',
        marginVertical: 20,
    },
    largeIconPreview: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 10,
    },
    searchInput: {
        backgroundColor: isDarkMode ? '#1E1E1E' : '#f0f0f0',
        borderRadius: 10,
        padding: 15,
        margin: 20,
        fontSize: 16,
        color: isDarkMode ? '#fff' : '#000',
    },
    iconGrid: {
        alignItems: 'center',
    },
    iconWrapper: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    selectButton: {
        backgroundColor: '#2196F3',
        padding: 20,
        margin: 20,
        borderRadius: 30,
        alignItems: 'center',
    },
    selectButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default IconPicker;
