import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { DashboardSummaryView, OverviewChartView, TopSpendingView } from '@/features/dashboard';

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <DashboardSummaryView />
      <OverviewChartView />
      <TopSpendingView />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
});
