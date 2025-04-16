import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../../navigations/DrawerNavigator';
import Header from '../../components/Header';
import { RootState, AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTotalDocumentData } from '../../redux/reducers/totalDocumentReducer';
import moment from 'moment';

type Card1ScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList, 'Total Document'>;

interface Card1ScreenProps {
  navigation: Card1ScreenNavigationProp;
}

const Card1Screen = ({ navigation }: Card1ScreenProps) => {
  const { colors, isDarkMode } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const totalDocumentData = useSelector((state: RootState) => state.totalDocument.data);
  const isLoading = useSelector((state: RootState) => state.totalDocument.loading);
  const error = useSelector((state: RootState) => state.totalDocument.error);

  useEffect(() => {
    dispatch(fetchTotalDocumentData());
  }, [dispatch]);

  const handleLoadMore = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      setPage(prev => prev + 1);
      setTimeout(() => setLoadingMore(false), 1000);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    dispatch(fetchTotalDocumentData());
    setRefreshing(false);
  };

  const renderHeader = () => (
    <View style={[styles.headerRow, { backgroundColor: isDarkMode ? colors.background.paper : colors.background.paper }]}>
      <Text style={[styles.headerText, { color: colors.text.primary }]}>Sr. No.</Text>
      <Text style={[styles.headerText, { color: colors.text.primary }]}>Name</Text>
      <Text style={[styles.headerText, { color: colors.text.primary }]}>Subject</Text>
      <Text style={[styles.headerText, { color: colors.text.primary }]}>Sub-Subject</Text>
      <Text style={[styles.headerText, { color: colors.text.primary }]}>File Date</Text>
    </View>
  );

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <View style={[styles.row, { backgroundColor: isDarkMode ? colors.background.paper : colors.background.paper }]}>
      <Text style={[styles.cell, { color: colors.text.primary }]}>{index + 1}</Text>
      <Text style={[styles.cell, { color: colors.text.primary }]}>{item.fileNo}</Text>
      <Text style={[styles.cell, { color: colors.text.primary }]}>{item.subj}</Text>
      <Text style={[styles.cell, { color: colors.text.primary }]}>{item.sub_Subject_Name}</Text>
      <Text style={[styles.cell, { color: colors.text.primary }]}>{moment(item.fDate).format('DD-MM-YYYY')}</Text>
    </View>
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator color={colors.primary.main} />
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? colors.background.dark : colors.background.default }]}>
      <Header 
        title="Total Document" 
        navigation={navigation} 
      />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary.main} />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.error.main }]}>{error}</Text>
        </View>
      ) : (
        <View style={styles.tableContainer}>
          {renderHeader()}
          <FlatList
            data={totalDocumentData?.data || []}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={renderFooter}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            contentContainerStyle={styles.content}
            style={styles.list}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tableContainer: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : 16,
  },
  headerRow: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  list: {
    flex: 1,
    marginTop: 56, // Height of headerRow + padding
  },
  row: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
  },
  content: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default Card1Screen; 