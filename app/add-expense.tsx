import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { AddExpenseTabs, ExpenseIncomeForm } from '@/features/add-expense';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function AddExpenseScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'expense' | 'income'>('expense');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <FontAwesome name="close" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Transaction</Text>
      </View>
      
      <AddExpenseTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <ExpenseIncomeForm type={activeTab} />
      
      {/* A placeholder for showing added items could go here */}
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    left: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
