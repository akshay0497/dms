import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator, Platform, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../../navigations/DrawerNavigator';
import Header from '../../components/Header';
import { RootState, AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { fetchTotalDocumentTypeData } from '@/redux/reducers/totalDocumentTypeReducer';

type Card1ScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList, 'Total Document'>;

interface Card1ScreenProps {
  navigation: Card1ScreenNavigationProp;
}

const TotalDocumentType = ({ navigation }: Card1ScreenProps) => {
  const { colors, isDarkMode } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filterText, setFilterText] = useState('');

  const totalDocumentTypeData = useSelector((state: RootState) => state.totalDocumentType.data);
  const isLoading = useSelector((state: RootState) => state.totalDocumentType.loading);
  const error = useSelector((state: RootState) => state.totalDocumentType.error);

  useEffect(() => {
    dispatch(fetchTotalDocumentTypeData(6));
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
    dispatch(fetchTotalDocumentTypeData(6));
    setRefreshing(false);
  };

  //console.log("totalDocumentTypeData",totalDocumentTypeData)
  const filteredData = totalDocumentTypeData?.data?.totTypelst?.filter((item: any) => {
    const search = filterText.toLowerCase();
    return (
      item.doc_Name?.toLowerCase().includes(search) ||
      item.doc_shortname?.toLowerCase().includes(search) 
    );
  });

  const renderHeader = () => (
    <View style={[styles.headerRow, { backgroundColor: isDarkMode ? colors.background.paper : '#000080'  }]}>
      <Text style={[styles.headerText, { color: '#ffffff' }]}>Sr. No.</Text>
      <Text style={[styles.headerText, { color: '#ffffff' }]}>Doc Name</Text>
      <Text style={[styles.headerText, { color: '#ffffff' }]}>Doc Short Name</Text>
    </View>
  );

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <View style={[styles.row, { backgroundColor: isDarkMode ? colors.background.paper : colors.background.paper }]}>
      <Text style={[styles.cell, { color: colors.text.primary }]}>{index + 1}</Text>
      <Text style={[styles.cell, { color: colors.text.primary }]}>{item.doc_Name}</Text>
      <Text style={[styles.cell, { color: colors.text.primary }]}>{item.doc_shortname}</Text>
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
      <Header title="Total Document Type" navigation={navigation} />

      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search by Name, short name"
          value={filterText}
          onChangeText={setFilterText}
          style={[
            styles.input,
            {
              backgroundColor: colors.background.paper,
              color: colors.text.primary,
              borderColor: colors.text.primary,
            },
          ]}
          placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
        />
      </View>

      {isLoading ?
       (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary.main} />
        </View>
      ) 
      : error ? (
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.error.main }]}>{error}</Text>
        </View>
      ) : 
      (
        <View style={styles.tableContainer}>
          {renderHeader()}
          {filteredData?.length > 0 ? (
      <FlatList
        data={filteredData}
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
    ) : (
      <View style={styles.noDataContainer}>
        <Text style={[styles.noDataText, { color: colors.text.primary }]}>No records found</Text>
      </View>
      )
      }
      </View>)}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  list: {
    flex: 1,
    marginTop: 56,
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
    color:"#ffffff",
    borderTopRightRadius:12
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
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#999',
  },
});

export default TotalDocumentType;
