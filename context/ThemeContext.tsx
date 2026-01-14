import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';

type Theme = 'light' | 'dark';
type ThemePreference = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: Theme;
    themePreference: ThemePreference;
    setThemePreference: (pref: ThemePreference) => void;
    toggleTheme: () => void; // Keeping for backward compatibility if needed
    isDarkMode: boolean;
}

// The Theme Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// region THEME PROVIDER
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const systemScheme = useColorScheme();
    const [themePreference, setThemePreference] = useState<ThemePreference>('system');
    const [theme, setTheme] = useState<Theme>(systemScheme === 'dark' ? 'dark' : 'light');

    // region Update Theme
    useEffect(() => {
        if (themePreference === 'system') {
            setTheme(systemScheme === 'dark' ? 'dark' : 'light');
        } else {
            setTheme(themePreference);
        }
    }, [themePreference, systemScheme]);

    // region Toggle Theme
    const toggleTheme = () => {
        setThemePreference((prev) => {
            if (prev === 'light') return 'dark';
            if (prev === 'dark') return 'system';
            return 'light'; // Cycle through options or just toggle light/dark?
            // For a simple toggle button, usually it's light <-> dark.
            // But since we are adding a full selector, this might be less used.
            // Let's make it toggle between light and dark for the header button.
            return prev === 'light' ? 'dark' : 'light';
        });
    };

    const isDarkMode = theme === 'dark';

    return (
        <ThemeContext.Provider value={{ theme, themePreference, setThemePreference, toggleTheme, isDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

// region CUSTOM HOOK
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
