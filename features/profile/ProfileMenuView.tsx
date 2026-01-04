import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

interface MenuItemProps {
  icon: string;
  iconColor: string;
  bgColor: string;
  text: string;
  onPress?: () => void;
  isSwitch?: boolean;
}

const MenuItem = ({ icon, iconColor, bgColor, text, onPress, isSwitch }: MenuItemProps) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} disabled={isSwitch}>
      <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
        <FontAwesome name={icon} size={20} color={iconColor} />
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
        <FontAwesome name="angle-right" size={20} color="#ccc" />
      )}
    </TouchableOpacity>
  );
};

const ProfileMenuView = () => {
  const router = useRouter();

  return (
    <View style={styles.menuContainer}>
      <Text style={styles.sectionHeader}>General</Text>
      <MenuItem
        icon="user-o"
        iconColor="#2196F3"
        bgColor="#E3F2FD"
        text="Personal Information"
        onPress={() => console.log('Navigate to Personal Info')}
      />
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

      <Text style={styles.sectionHeader}>Security</Text>
      <MenuItem
        icon="lock"
        iconColor="#9C27B0"
        bgColor="#F3E5F5"
        text="Change Password"
        onPress={() => console.log('Navigate to Change Password')}
      />
      <MenuItem
        icon="shield"
        iconColor="#F44336"
        bgColor="#FFEBEE"
        text="Privacy Policy"
        onPress={() => console.log('Navigate to Privacy Policy')}
      />

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
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
    color: '#333',
    fontWeight: '500',
  },
  logoutButton: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#FFEBEE',
    borderRadius: 16,
  },
  logoutText: {
    color: '#F44336',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileMenuView;
