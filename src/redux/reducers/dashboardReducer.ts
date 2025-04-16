import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API_CONFIG } from '../../config/api';
import api from '../../services/api';

interface DashboardState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  data: null,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDashboardData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setDashboardData, setLoading, setError } = dashboardSlice.actions;

const getDashboardData = async () => {
  try {
    const endpoint = API_CONFIG.ENDPOINTS.AUTH.Dashboard;
    const fullUrl = `${API_CONFIG.BASE_URL}${endpoint}`;
    console.log('Dashboard Request Details:', {
      endpoint,
      fullUrl
    });

    const collectData = {
      type: 1,
      pageID: 1,
      searchBy: "",
      fromdt: "2025-04-12",
      todt: "2025-04-12",
      print: 1
    };

    const response = await api.post(endpoint, collectData);
    console.log('Dashboard Response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Dashboard API Error:', error);
    throw error;
  }
};

export const fetchDashboardData = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const data = await getDashboardData();
    dispatch(setDashboardData(data));
  } catch (error: any) {
    console.error('Dashboard Fetch Error:', error);
    dispatch(setError(error.message || 'Failed to fetch dashboard data'));
  }
};

export default dashboardSlice.reducer; 