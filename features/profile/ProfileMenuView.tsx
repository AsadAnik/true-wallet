import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';

interface MenuItemProps {
    icon: string;
    iconColor: string;
    bgColor: string;
    text: string;
    onPress?: () => void;
    isSwitch?: boolean;
    styles: any;
    isDarkMode: boolean;
}

// region MENU ITEM
const MenuItem = ({ icon, iconColor, bgColor, text, onPress, isSwitch, styles, isDarkMode }: MenuItemProps) => {
    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <TouchableOpacity style={styles.menuItem} onPress={onPress} disabled={isSwitch}>
            <View style={[styles.iconContainer, { backgroundColor: isDarkMode ? '#333' : bgColor }]}>
                <FontAwesome name={icon as any} size={20} color={iconColor}/>
            </View>
            <Text style={styles.menuText}>{text}</Text>
            {isSwitch ? (
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#2196F3" : "#f4f3f4"}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            ) : (
                <FontAwesome name="angle-right" size={20} color={isDarkMode ? '#666' : '#ccc'}/>
            )}
        </TouchableOpacity>
    );
};

// region PROFILE MENU VIEW
const ProfileMenuView = () => {
    const router = useRouter();
    const { isDarkMode } = useTheme();
    const styles = useMemo(() => createStyles(isDarkMode), [isDarkMode]);

    return (
        <View style={styles.menuContainer}>
            <Text style={styles.sectionHeader}>General</Text>
            <MenuItem
                icon="user-o"
                iconColor="#2196F3"
                bgColor="#E3F2FD"
                text="Personal Information"
                onPress={() => console.log('Navigate to Personal Info')}
                styles={styles}
                isDarkMode={isDarkMode}
            />
            <MenuItem
                icon="credit-card"
                iconColor="#4CAF50"
                bgColor="#E8F5E9"
                text="My Cards"
                onPress={() => router.push('/cards')}
                styles={styles}
                isDarkMode={isDarkMode}
            />
            <MenuItem
                icon="bell-o"
                iconColor="#FF9800"
                bgColor="#FFF3E0"
                text="Notifications"
                isSwitch={true}
                styles={styles}
                isDarkMode={isDarkMode}
            />

            <Text style={styles.sectionHeader}>Security</Text>
            <MenuItem
                icon="lock"
                iconColor="#9C27B0"
                bgColor="#F3E5F5"
                text="Change Password"
                onPress={() => console.log('Navigate to Change Password')}
                styles={styles}
                isDarkMode={isDarkMode}
            />
            <MenuItem
                icon="shield"
                iconColor="#F44336"
                bgColor="#FFEBEE"
                text="Privacy Policy"
                onPress={() => console.log('Navigate to Privacy Policy')}
                styles={styles}
                isDarkMode={isDarkMode}
            />

            <TouchableOpacity style={styles.logoutButton}>
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
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
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: isDarkMode ? '#000' : '#fff',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 2,
        elevation: 1,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    menuText: {
        flex: 1,
        fontSize: 16,
        color: isDarkMode ? '#fff' : '#333',
        fontWeight: '500',
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
