import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeColors {
  primary: {
    main: string;
    contrast: string;
  };
  background: {
    default: string;
    dark: string;
    paper: string;
  };
  text: {
    primary: string;
    secondary: string;
  };
  error: {
    main: string;
    contrast: string;
  };
  success: {
    main: string;
    contrast: string;
  };
  warning: {
    main: string;
    contrast: string;
  };
  border: {
    main: string;
  };
}

interface ThemeContextType {
  colors: ThemeColors;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const lightColors: ThemeColors = {
  primary: {
    main: '#2196F3',
    contrast: '#FFFFFF',
  },
  background: {
    default: '#FFFFFF',
    dark: '#F5F5F5',
    paper: '#FFFFFF',
  },
  text: {
    primary: '#000000',
    secondary: '#666666',
  },
  error: {
    main: '#F44336',
    contrast: '#FFFFFF',
  },
  success: {
    main: '#4CAF50',
    contrast: '#FFFFFF',
  },
  warning: {
    main: '#FFC107',
    contrast: '#000000',
  },
  border: {
    main: '#E0E0E0',
  },
};

const darkColors: ThemeColors = {
  primary: {
    main: '#1976D2',
    contrast: '#FFFFFF',
  },
  background: {
    default: '#121212',
    dark: '#1E1E1E',
    paper: '#1E1E1E',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#B0B0B0',
  },
  error: {
    main: '#D32F2F',
    contrast: '#FFFFFF',
  },
  success: {
    main: '#388E3C',
    contrast: '#FFFFFF',
  },
  warning: {
    main: '#F57C00',
    contrast: '#FFFFFF',
  },
  border: {
    main: '#424242',
  },
};

const ThemeContext = createContext<ThemeContextType>({
  colors: lightColors,
  isDarkMode: false,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
      } else {
        // Default to light mode
        setIsDarkMode(false);
        await AsyncStorage.setItem('theme', 'light');
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
      setIsDarkMode(false);
    }
  };

  const toggleTheme = async () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ colors, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext); 