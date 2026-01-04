import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface AddExpenseTabsProps {
  activeTab: 'expense' | 'income';
  onTabChange: (tab: 'expense' | 'income') => void;
}

const AddExpenseTabs = ({ activeTab, onTabChange }: AddExpenseTabsProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'expense' && styles.activeTab]}
        onPress={() => onTabChange('expense')}
      >
        <FontAwesome name="arrow-up" size={16} color={activeTab === 'expense' ? '#fff' : '#F44336'} />
        <Text style={[styles.tabText, activeTab === 'expense' && styles.activeTabText]}>Expense</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'income' && styles.activeTab]}
        onPress={() => onTabChange('income')}
      >
        <FontAwesome name="arrow-down" size={16} color={activeTab === 'income' ? '#fff' : '#4CAF50'} />
        <Text style={[styles.tabText, activeTab === 'income' && styles.activeTabText]}>Income</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 30,
    margin: 20,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 26,
  },
  activeTab: {
    backgroundColor: '#2196F3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  activeTabText: {
    color: '#fff',
  },
});

export default AddExpenseTabs;
