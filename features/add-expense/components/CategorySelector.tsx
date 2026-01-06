import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const categories = [
  { key: 'salary', text: 'Salary', icon: 'money' },
  { key: 'freelancing', text: 'Freelancing', icon: 'laptop' },
  { key: 'side_hustle', text: 'Side Hustle', icon: 'briefcase' },
  { key: 'borrow', text: 'Borrow', icon: 'handshake-o' },
  { key: 'gift', text: 'Gift', icon: 'gift' },
  { key: 'investment', text: 'Investment', icon: 'line-chart' },
];

interface CategorySelectorProps {
  onSelect: (category: string) => void;
}

// region CATEGORY SELECTOR
const CategorySelector = ({ onSelect }: CategorySelectorProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (key: string) => {
    setSelected(key);
    onSelect(key);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Category</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.key}
        numColumns={2}
        columnWrapperStyle={styles.row}
        scrollEnabled={false} // Disable scrolling if the list is short enough
        renderItem={({ item }) => {
          const isSelected = selected === item.key;
          return (
            <Pressable
              style={[styles.gridItem, isSelected && styles.selectedGridItem]}
              onPress={() => handleSelect(item.key)}
            >
              <View style={[styles.iconContainer, isSelected && styles.selectedIconContainer]}>
                <FontAwesome name={item.icon as any} size={24} color={isSelected ? '#fff' : '#2196F3'} />
              </View>
              <Text style={[styles.itemText, isSelected && styles.selectedItemText]}>{item.text}</Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

// region STYLE-SHEET
const styles = StyleSheet.create({
  container: {
    // flex: 1, // This was causing the layout issue
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  gridItem: {
    width: '48%', // Slightly less than 50% to account for spacing
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  selectedGridItem: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedIconContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  itemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  selectedItemText: {
    color: '#fff',
  },
});

export default CategorySelector;
