import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Linking, TouchableOpacity, Dimensions, Text, ActivityIndicator, ImageBackground } from 'react-native';
import { Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from '../../theme/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../../navigations/DrawerNavigator';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchDashboardData } from '../../redux/reducers/dashboardReducer';
import Animated, { useAnimatedProps, useSharedValue, withTiming, withSpring } from 'react-native-reanimated';
import { TextInput } from 'react-native-gesture-handler';

type HomeScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface DashboardData {
  totDoc: number;
  totIndexFile: number;
  totType: number;
  totsplitedFile: number;
}

const AnimatedNumber = ({ value, style }: { value: number, style: any }) => {
  const animatedValue = useSharedValue(0);
  const animatedProps = useAnimatedProps(() => {
    return {
      text: Math.round(animatedValue.value).toString(),
      defaultValue: Math.round(animatedValue.value).toString(),
    };
  });

  useEffect(() => {
    animatedValue.value = withSpring(value, {
      damping: 20,
      stiffness: 90,
      mass: 0.5,
    });
  }, [value]);

  return (
    <AnimatedTextInput
      animatedProps={animatedProps}
      editable={false}
      style={style}
    />
  );
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { t } = useTranslation();
  const { colors, isDarkMode } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const [dashboardDatas, setDashboardData] = useState<DashboardData | null>(null);
  const dashboardData = useSelector((state: RootState) => state.dashboard.data);
  const isLoading = useSelector((state: RootState) => state.dashboard.loading);
  const error = useSelector((state: RootState) => state.dashboard.error);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  useEffect(() => {
    if (dashboardData?.data?.dashboardcls?.[0]) {
      const newData = {
        totDoc: Number(dashboardData.data.dashboardcls[0].totDoc) || 0,
        totIndexFile: Number(dashboardData.data.dashboardcls[0].totIndexFile) || 0,
        totType: Number(dashboardData.data.dashboardcls[0].totType) || 0,
        totsplitedFile: Number(dashboardData.data.dashboardcls[0].totsplitedFile) || 0,
      };
      setDashboardData(newData);
    }
  }, [dashboardData]);

  const handleCardPress = (route: keyof RootDrawerParamList) => {
    navigation.navigate(route);
  };

  const handleAboutPress = () => {
    navigation.navigate('About');
  };

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
      strokeWidth: 2
    }]
  };

  const chartConfig = {
    backgroundGradientFrom: isDarkMode ? colors.background.dark : colors.background.paper,
    backgroundGradientTo: isDarkMode ? colors.background.dark : colors.background.paper,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
    labelColor: (opacity = 1) => isDarkMode 
      ? `rgba(249, 250, 251, ${opacity})` 
      : `rgba(17, 24, 39, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: colors.chart.line
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? colors.background.dark : colors.background.default }]}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => navigation.openDrawer()}
        >
          <Icon 
            name="menu" 
            size={24} 
            color={isDarkMode ? colors.text.primary : colors.text.primary} 
          />
        </TouchableOpacity>
        
        <Text style={[styles.dashboardTitle, { color: isDarkMode ? colors.text.primary : colors.text.primary }]}>
          {t('Dashboard')}
        </Text>

        <TouchableOpacity 
          style={styles.iconButton}
          onPress={handleAboutPress}
        >
          <Icon 
            name="information" 
            size={24} 
            color={isDarkMode ? colors.text.primary : colors.text.primary} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary.main} />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={[styles.errorText, { color: colors.error.main }]}>
              {error}
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.statsContainer}>
              <TouchableOpacity 
                style={[styles.statItem, { backgroundColor: colors.primary.main }]}
                onPress={() => handleCardPress('Total Document')}
              >
                <View style={styles.statIconContainer}>
                  <Icon name="file-document" size={32} color={colors.primary.contrast} />
                </View>
                <View style={styles.statContent}>
                  <Text style={[styles.statTitle, { color: colors.primary.contrast }]}>
                    {t('Total Document')}
                  </Text>
                  <AnimatedNumber 
                    value={dashboardDatas?.totDoc || 0} 
                    style={[styles.statValue, { color: colors.primary.contrast }]} 
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.statItem, { backgroundColor: colors.success.main }]}
                onPress={() => handleCardPress('Total Index File')}
              >
                <View style={styles.statIconContainer}>
                  <Icon name="file-search" size={32} color={colors.success.contrast} />
                </View>
                <View style={styles.statContent}>
                  <Text style={[styles.statTitle, { color: colors.success.contrast }]}>
                    {t('Total Index File')}
                  </Text>
                  <AnimatedNumber 
                    value={dashboardDatas?.totIndexFile || 0} 
                    style={[styles.statValue, { color: colors.success.contrast }]} 
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.statItem, { backgroundColor: colors.warning.main }]}
                onPress={() => handleCardPress('Total Document Type')}
              >
                <View style={styles.statIconContainer}>
                  <Icon name="file-multiple" size={32} color={colors.warning.contrast} />
                </View>
                <View style={styles.statContent}>
                  <Text style={[styles.statTitle, { color: colors.warning.contrast }]}>
                    {t('Total Document Type')}
                  </Text>
                  <AnimatedNumber 
                    value={dashboardDatas?.totType || 0} 
                    style={[styles.statValue, { color: colors.warning.contrast }]} 
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.statItem, { backgroundColor: colors.error.main }]}
                onPress={() => handleCardPress('Total Split File')}
              >
                <View style={styles.statIconContainer}>
                  <Icon name="file-split" size={32} color={colors.error.contrast} />
                </View>
                <View style={styles.statContent}>
                  <Text style={[styles.statTitle, { color: colors.error.contrast }]}>
                    {t('Total Split File')}
                  </Text>
                  <AnimatedNumber 
                    value={dashboardDatas?.totsplitedFile || 0} 
                    style={[styles.statValue, { color: colors.error.contrast }]} 
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.chartSection}>
              <Text style={[styles.chartTitle, { color: isDarkMode ? colors.text.primary : colors.text.primary }]}>
                {t('Monthly Overview')}
              </Text>
              <View style={[styles.chartContainer, { backgroundColor: isDarkMode ? colors.background.dark : colors.background.paper }]}>
                <LineChart
                  data={chartData}
                  width={Dimensions.get('window').width - 32}
                  height={220}
                  chartConfig={chartConfig}
                  bezier
                  style={styles.chartStyle}
                  withDots={true}
                  withInnerLines={true}
                  withOuterLines={true}
                  withVerticalLines={false}
                  withHorizontalLines={true}
                  withVerticalLabels={true}
                  withHorizontalLabels={true}
                  yAxisLabel=""
                  yAxisSuffix=""
                  yAxisInterval={1}
                />
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  iconButton: {
    padding: 8,
  },
  dashboardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    padding: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  statContent: {
    flex: 1,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  chartSection: {
    padding: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  chartContainer: {
    borderRadius: 12,
    padding: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
});

export default HomeScreen;