// Zone/GetZonemaster

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API_CONFIG } from '../../config/api';
import api from '../../services/api';

interface ChartState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: ChartState = {
  data: null,
  loading: false,
  error: null,
};

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setChartData: (state, action: PayloadAction<any>) => {
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

export const { setChartData, setLoading, setError } = chartSlice.actions;

const getChartData = async () => {
  try {
    const endpoint = API_CONFIG.ENDPOINTS.AUTH.Chart;
    const fullUrl = `${API_CONFIG.BASE_URL}${endpoint}`;
    console.log('Chart Request Details:', {
      endpoint,
      fullUrl
    });

    const collectData = {
        "zoneID": -1,
        "user_ID": -1,
    };

    const response = await api.post(endpoint, collectData);
    console.log('Chart Response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Chart API Error:', error);
    throw error;
  }
};

export const fetchChartData = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const data = await getChartData();
    dispatch(setChartData(data));
  } catch (error: any) {
    console.error('Chart Fetch Error:', error);
    dispatch(setError(error.message || 'Failed to fetch Chart data'));
  }
};

export default chartSlice.reducer; 