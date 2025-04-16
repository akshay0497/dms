import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../navigations/DrawerNavigator';

interface HeaderProps {
  title: string;
  navigation: DrawerNavigationProp<RootDrawerParamList>;
  showBackButton?: boolean;
}

const Header = ({ title, navigation, showBackButton = true }: HeaderProps) => {
  const { colors, isDarkMode } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={styles.header}>
      {showBackButton && (
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon 
            name="arrow-left" 
            size={24} 
            color={isDarkMode ? colors.text.primary : colors.text.primary} 
          />
        </TouchableOpacity>
      )}
      <Text style={[styles.title, { color: isDarkMode ? colors.text.primary : colors.text.primary }]}>
        {t(title)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
});

export default Header; 