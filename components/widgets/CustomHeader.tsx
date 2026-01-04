import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, useColorScheme } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CustomHeaderProps {
  title: string;
  headerRight?: React.ReactNode;
}

const ThemeToggleButton = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const toggleTheme = () => {
    console.log('Toggle theme');
  };

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

export default function CustomHeader({ title, headerRight }: CustomHeaderProps) {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.leftPlaceholder} />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.rightContainer}>
          {headerRight || <ThemeToggleButton />}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
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
  leftPlaceholder: {
    width: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
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
