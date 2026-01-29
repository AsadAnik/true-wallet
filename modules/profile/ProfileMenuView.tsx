import React, { useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { MenuItem, ThemeSelector } from './components';

// region PROFILE MENU VIEW
const ProfileMenuView = () => {
    const router = useRouter();
    const { isDarkMode } = useTheme();
    const styles = useMemo(() => createStyles(isDarkMode), [isDarkMode]);

    return (
        <View style={styles.menuContainer}>
            <Text style={styles.sectionHeader}>General</Text>
            <MenuItem
                icon="credit-card"
                iconColor="#4CAF50"
                bgColor="#E8F5E9"
                text="My Cards"
                onPress={() => router.push('/cards')}
            />
            <MenuItem
                icon="bell-o"
                iconColor="#FF9800"
                bgColor="#FFF3E0"
                text="Notifications"
                isSwitch={true}
            />
            <MenuItem
                icon="user-o"
                iconColor="#2196F3"
                bgColor="#E3F2FD"
                text="About"
                onPress={() => console.log('Navigate to Personal Info')}
            />

            <Text style={styles.sectionHeader}>Appearance</Text>
            <ThemeSelector/>

            <Text style={styles.sectionHeader}>Security</Text>
            <MenuItem
                icon="shield"
                iconColor="#F44336"
                bgColor="#FFEBEE"
                text="Privacy Policy"
                onPress={() => console.log('Navigate to Privacy Policy')}
            />

            {/*<TouchableOpacity style={styles.logoutButton}>*/}
            {/*    <Text style={styles.logoutText}>Log Out</Text>*/}
            {/*</TouchableOpacity>*/}
        </View>
    );
};

// region STYLE-SHEET
const createStyles = (isDarkMode: boolean) => StyleSheet.create({
    menuContainer: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        color: isDarkMode ? '#fff' : '#333',
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 4,
    },
    logoutButton: {
        marginTop: 20,
        alignItems: 'center',
        paddingVertical: 16,
        backgroundColor: isDarkMode ? '#330000' : '#FFEBEE',
        borderRadius: 16,
    },
    logoutText: {
        color: '#F44336',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default ProfileMenuView;
