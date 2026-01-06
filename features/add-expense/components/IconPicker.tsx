import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput, ScrollView, FlatList } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ColorSelector from './ColorSelector';

// A curated list of FontAwesome icons
const iconNames = [
    'shopping-cart', 'cutlery', 'car', 'plane', 'home', 'film', 'gamepad', 'book', 'briefcase',
    'medkit', 'heart', 'star', 'music', 'coffee', 'gift', 'train', 'bus', 'ship', 'motorcycle',
    'bicycle', 'building', 'paw', 'futbol-o', 'paint-brush', 'wrench', 'camera', 'phone',
];

interface IconPickerProps {
    onSelect: (icon: string, color: string) => void;
}

const IconPicker = ({ onSelect }: IconPickerProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState('shopping-cart');
    const [selectedColor, setSelectedColor] = useState('#FF9800');
    const [searchTerm, setSearchTerm] = useState('');

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
                            <FontAwesome name="close" size={24} color="#333"/>
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
                                <FontAwesome name={item as any} size={30} color="#333"/>
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

const styles = StyleSheet.create({
    pickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
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
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
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
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 15,
        margin: 20,
        fontSize: 16,
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
