import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';

interface CustomHeaderProps {
  title: string;
  headerRight?: React.ReactNode;
}

// region TOGGLE BUTTON
const ThemeToggleButton = () => {
  const { toggleTheme, isDarkMode } = useTheme();

  return (
    <TouchableOpacity onPress={toggleTheme} style={styles.rightButton}>
      <FontAwesome
        name={isDarkMode ? 'sun-o' : 'moon-o'}
        size={24}
        color={isDarkMode ? '#fff' : '#333'}
      />
    </TouchableOpacity>
  );
};

// region CUSTOM HEADER
export default function CustomHeader({ title, headerRight }: CustomHeaderProps) {
  const { isDarkMode } = useTheme();

  return (
    <SafeAreaView edges={['top']} style={[styles.safeArea, isDarkMode && styles.safeAreaDark]}>
      <View style={[styles.container, isDarkMode && styles.containerDark]}>
        <View style={styles.leftPlaceholder} />
        <Text style={[styles.title, isDarkMode && styles.titleDark]}>{title}</Text>
        <View style={styles.rightContainer}>
          {headerRight || <ThemeToggleButton />}
        </View>
      </View>
    </SafeAreaView>
  );
}

// region STYLE-SHEET
const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
  },
  safeAreaDark: {
    backgroundColor: '#121212',
  },
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  containerDark: {
    borderBottomColor: '#333',
  },
  leftPlaceholder: {
    width: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  titleDark: {
    color: '#fff',
  },
  rightContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
