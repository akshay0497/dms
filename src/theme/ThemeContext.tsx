import React, { createContext, useContext, useState, useEffect } from 'react';
import { COLORS, getThemeColors, ThemeColors, ThemeMode } from './colors';
import { useColorScheme } from 'react-native';

interface ThemeContextType {
  colors: ThemeColors;
  mode: ThemeMode;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    setIsDarkMode(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const themeColors = getThemeColors(isDarkMode);

  return (
    <ThemeContext.Provider
      value={{
        colors: themeColors,
        mode: isDarkMode ? themeColors.mode : themeColors.mode,
        isDarkMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 