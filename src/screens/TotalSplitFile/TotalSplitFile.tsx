import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import { RootDrawerParamList } from '@/navigations/DrawerNavigator';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import Header from '@/components/Header';

type Card1ScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList, 'Total Document'>;

interface Card1ScreenProps {
  navigation: Card1ScreenNavigationProp;
}

const TotalSplitFile = ({ navigation }: Card1ScreenProps) => {
  const { colors, isDarkMode } = useTheme();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? colors.background.dark : colors.background.default }]}>
      <Header 
        title="Total Split File" 
        navigation={navigation} 
      />

      <ScrollView style={styles.content}>
        <View style={[styles.card, { backgroundColor: isDarkMode ? colors.background.paper : colors.background.paper }]}>
          <Text style={[styles.cardTitle, { color: isDarkMode ? colors.text.primary : colors.text.primary }]}>
            {t('List of Total Split File')}
          </Text>
          <Text style={[styles.cardText, { color: isDarkMode ? colors.text.secondary : colors.text.secondary }]}>
            {t('This is the content for Total Split File. You can add any relevant information here.')}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default TotalSplitFile; 