import React, { useMemo } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { ProfileHeaderView, ProfileMenuView } from '@/features/profile';
import { useTheme } from '@/context/ThemeContext';

// region PROFILE SCREEN
const ProfileScreen = () => {
    const { isDarkMode } = useTheme();
    const styles = useMemo(() => createStyles(isDarkMode), [isDarkMode]);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <ProfileHeaderView/>
            <ProfileMenuView/>
        </ScrollView>
    );
}

// region STYLE-SHEET
const createStyles = (isDarkMode: boolean) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: isDarkMode ? '#121212' : '#F8F9FA',
    },
});

export default ProfileScreen;