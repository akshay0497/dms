import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, SafeAreaView } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useTheme } from '../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { changeLanguage } from '../redux/actions/languageActions';
import { logout } from '../redux/actions/authActions';
import i18n from '../localization/i18n';

const CustomDrawerItem = ({ label, icon, onPress, isFocused, colors, isDarkMode }: any) => (
  <TouchableOpacity
    style={[
      styles.drawerItem,
      isFocused && { backgroundColor: isDarkMode ? colors.background.dark : colors.background.paper }
    ]}
    onPress={onPress}
  >
    <Icon
      name={icon}
      size={24}
      color={isFocused ? colors.primary.main : (isDarkMode ? colors.text.secondary : colors.text.primary)}
      style={styles.icon}
    />
    <Text
      style={[
        styles.label,
        { color: isFocused ? colors.primary.main : (isDarkMode ? colors.text.secondary : colors.text.primary) }
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const CustomDrawerContent = (props: any) => {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const isHindi = useSelector((state: RootState) => (state.language as any).isHindi);
  const isLoggedIn = useSelector((state: RootState) => (state.auth as any).isLoggedIn);
  const user = useSelector((state: RootState) => (state.auth as any).user);

  const handleLanguageToggle = () => {
    const newLanguage = !isHindi;
    dispatch(changeLanguage(newLanguage) as any);
    i18n.changeLanguage(newLanguage ? 'en' : 'hi');
  };

  const handleLogout = () => {
    dispatch(logout() as any);
  };

  const drawerItems = [
    { name: 'Home', icon: 'home', label: t('Home') },
    { name: 'Total Document', icon: 'file-document', label: t('Total Document') },
    { name: 'Total Index File', icon: 'file-search', label: t('Total Index File') },
    { name: 'Total Document Type', icon: 'file-multiple', label: t('Total Document Type') },
    { name: 'Total Split File', icon: 'file-split', label: t('Total Split File') },
    { name: 'About', icon: 'information', label: t('About') },
  ];

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? colors.background.dark : colors.background.default }]}>
      <DrawerContentScrollView
        {...props}
        style={styles.scrollView}
      >
        {/* User Profile Section */}
        <View style={[styles.profileSection, { backgroundColor: isDarkMode ? colors.background.paper : colors.background.paper }]}>
          <View style={styles.profileInfo}>
            <Text style={[styles.userName, { color: isDarkMode ? colors.text.primary : colors.text.primary }]}>
              {user?.name || t('Guest User')}
            </Text>
            <Text style={[styles.userEmail, { color: isDarkMode ? colors.text.secondary : colors.text.secondary }]}>
              {user?.username || t('Not logged in')}
            </Text>
          </View>
        </View>

        {/* Navigation Items */}
        <View style={styles.drawerItems}>
          {drawerItems.map((item) => (
            <CustomDrawerItem
              key={item.name}
              label={item.label}
              icon={item.icon}
              onPress={() => props.navigation.navigate(item.name)}
              isFocused={props.state.index === props.state.routes.findIndex((route: any) => route.name === item.name)}
              colors={colors}
              isDarkMode={isDarkMode}
            />
          ))}
        </View>
      </DrawerContentScrollView>

      {/* Fixed Bottom Buttons */}
      <SafeAreaView style={[styles.footer, { backgroundColor: isDarkMode ? colors.background.paper : colors.background.paper }]}>
        <TouchableOpacity
          style={[styles.toggleButton, { backgroundColor: isDarkMode ? colors.background.dark : colors.background.default }]}
          onPress={toggleTheme}
        >
          <Icon 
            name={isDarkMode ? "weather-sunny" : "weather-night"} 
            size={24} 
            color={isDarkMode ? colors.text.primary : colors.text.primary} 
          />
          <Text style={[styles.toggleText, { color: isDarkMode ? colors.text.primary : colors.text.primary }]}>
            {isDarkMode ? t('Light Mode') : t('Dark Mode')}
          </Text>
        </TouchableOpacity>

        {/* Language Toggle Button - Commented out
        <TouchableOpacity
          style={[styles.toggleButton, { backgroundColor: isDarkMode ? colors.background.dark : colors.background.default }]}
          onPress={handleLanguageToggle}
        >
          <Icon 
            name="translate" 
            size={24} 
            color={isDarkMode ? colors.text.primary : colors.text.primary} 
          />
          <Text style={[styles.toggleText, { color: isDarkMode ? colors.text.primary : colors.text.primary }]}>
            {isHindi ? "हिन्दी" : "English"}
          </Text>
        </TouchableOpacity>
        */}

        {isLoggedIn && (
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: colors.error.main }]}
            onPress={handleLogout}
          >
            <Icon 
              name="logout" 
              size={24} 
              color={colors.error.contrast} 
            />
            <Text style={[styles.logoutText, { color: colors.error.contrast }]}>
              {t('Logout')}
            </Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
  },
  drawerItems: {
    flex: 1,
    paddingTop: 10,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  icon: {
    marginRight: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
});

export default CustomDrawerContent;