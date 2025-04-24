import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../../navigations/DrawerNavigator';
import Header from '../../components/Header';

type Card2ScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList, 'Total Index File'>;

interface Card2ScreenProps {
  navigation: Card2ScreenNavigationProp;
}

const TotalIndexFile = ({ navigation }: Card2ScreenProps) => {
  const { colors, isDarkMode } = useTheme();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? colors.background.dark : colors.background.default }]}>
      <Header 
        title="Total Index File" 
        navigation={navigation} 
      />
      <ScrollView style={styles.content}>
        <View style={[styles.card, { backgroundColor: isDarkMode ? colors.background.paper : colors.background.paper }]}>
          <Text style={[styles.cardTitle, { color: isDarkMode ? colors.text.primary : colors.text.primary }]}>
            {t('Index File Content')}
          </Text>
          <Text style={[styles.cardText, { color: isDarkMode ? colors.text.secondary : colors.text.secondary }]}>
            {t('This is the index file content section.')}
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
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
  },
});

export default TotalIndexFile; 