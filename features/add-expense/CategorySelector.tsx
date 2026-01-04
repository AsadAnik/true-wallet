import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const categories = [
  { key: 'salary', text: 'Salary', icon: 'money' },
  { key: 'freelancing', text: 'Freelancing', icon: 'laptop' },
  { key: 'side_hustle', text: 'Side Hustle', icon: 'briefcase' },
  { key: 'borrow', text: 'Borrow', icon: 'handshake-o' },
];

interface CategorySelectorProps {
  onSelect: (category: string) => void;
}

const CategorySelector = ({ onSelect }: CategorySelectorProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (key: string) => {
    setSelected(key);
    onSelect(key);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map(category => {
          const isSelected = selected === category.key;
          return (
            <TouchableOpacity
              key={category.key}
              style={[styles.chip, isSelected && styles.selectedChip]}
              onPress={() => handleSelect(category.key)}
            >
              <FontAwesome name={category.icon} size={16} color={isSelected ? '#fff' : '#333'} />
              <Text style={[styles.chipText, isSelected && styles.selectedChipText]}>{category.text}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 10,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  selectedChip: {
    backgroundColor: '#2196F3',
  },
  chipText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  selectedChipText: {
    color: '#fff',
  },
});

export default CategorySelector;
