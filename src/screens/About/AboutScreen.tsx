import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../../navigations/DrawerNavigator';
import Header from '../../components/Header';

type AboutScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList, 'About'>;

interface AboutScreenProps {
  navigation: AboutScreenNavigationProp;
}

const AboutScreen = ({ navigation }: AboutScreenProps) => {
  const { colors, isDarkMode } = useTheme();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? colors.background.dark : colors.background.default }]}>
      <Header 
        title="About Document Management System" 
        navigation={navigation} 
      />

      <ScrollView style={styles.content}>
        <View style={[styles.card, { backgroundColor: isDarkMode ? colors.background.paper : colors.background.paper }]}>
          <Icon 
            name="file-document-multiple" 
            size={40} 
            color={colors.primary.main} 
            style={styles.icon}
          />
          <Text style={[styles.description, { color: isDarkMode ? colors.text.primary : colors.text.primary }]}>
            {t('This Document Management System (DMS) is designed to help organizations efficiently manage, store, and track their digital documents. The system provides features for document indexing, categorization, and secure access control.')}
          </Text>
          
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <Icon name="file-document" size={24} color={colors.primary.main} />
              <Text style={[styles.featureText, { color: isDarkMode ? colors.text.primary : colors.text.primary }]}>
                {t('Document Management')}
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Icon name="file-search" size={24} color={colors.success.main} />
              <Text style={[styles.featureText, { color: isDarkMode ? colors.text.primary : colors.text.primary }]}>
                {t('Advanced Indexing')}
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Icon name="file-multiple" size={24} color={colors.warning.main} />
              <Text style={[styles.featureText, { color: isDarkMode ? colors.text.primary : colors.text.primary }]}>
                {t('Document Types')}
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Icon name="file-split" size={24} color={colors.error.main} />
              <Text style={[styles.featureText, { color: isDarkMode ? colors.text.primary : colors.text.primary }]}>
                {t('File Splitting')}
              </Text>
            </View>
          </View>

          {/* <Text style={[styles.version, { color: isDarkMode ? colors.text.secondary : colors.text.secondary }]}>
            {t('Version 1.0.0')}
          </Text> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  icon: {
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 24,
    lineHeight: 24,
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  featureText: {
    fontSize: 16,
    marginLeft: 12,
  },
  version: {
    fontSize: 14,
    marginTop: 8,
  },
});

export default AboutScreen; 