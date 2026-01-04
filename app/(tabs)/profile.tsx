import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { ProfileHeaderView, ProfileMenuView } from '@/features/profile';

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ProfileHeaderView />
      <ProfileMenuView />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
});

export default ProfileScreen;