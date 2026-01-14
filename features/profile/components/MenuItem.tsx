import { StyleSheet, Text, View, TouchableOpacity, Switch } from 'react-native';
import { useMemo, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from "@/context/ThemeContext";

interface MenuItemProps {
    icon: string;
    iconColor: string;
    bgColor: string;
    text: string;
    onPress?: () => void;
    isSwitch?: boolean;
}

// region MENU ITEM
const MenuItem = ({ icon, iconColor, bgColor, text, onPress, isSwitch }: MenuItemProps) => {
    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const { isDarkMode } = useTheme();
    const styles = useMemo(() => createStyles(isDarkMode), [isDarkMode]);

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

// region STYLE-SHEET
const createStyles = (isDarkMode: boolean) => StyleSheet.create({
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
});

export default MenuItem;