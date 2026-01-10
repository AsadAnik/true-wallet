import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';

// region ROOT LAYOUT
export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <CustomStatusBar />
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="add-expense" options={{ presentation: 'modal', title: 'Add Expense', headerShown: false }} />
                    <Stack.Screen name="settings" options={{ title: 'Settings' }} />
                    <Stack.Screen name="cards" options={{ headerShown: false }} />
                </Stack>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}

// region CUSTOM STATUS BAR
const CustomStatusBar = () => {
    const { isDarkMode } = useTheme();
    return (
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
    );
};