import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API_CONFIG } from '../../config/api';
import api from '../../services/api';

interface totalDocumentTypeState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: totalDocumentTypeState = {
  data: null,
  loading: false,
  error: null,
};

const totalDocumentTypeSlice = createSlice({
  name: 'totalDocument',
  initialState,
  reducers: {
    setTotalDocumentTypeData: (state, action: PayloadAction<any>) => {
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

export const { setTotalDocumentTypeData, setLoading, setError } = totalDocumentTypeSlice.actions;

const getTotalDocumentTypeData = async (id:number) => {
  try {
    const endpoint = API_CONFIG.ENDPOINTS.AUTH.TotalDocumentType;
    const fullUrl = `${API_CONFIG.BASE_URL}${endpoint}`;
    console.log('TotalDocument Request Details:', {
      endpoint,
      fullUrl
    });

    const currentISOTime = new Date().toISOString();
    const collectData = {
      type: id,
      pageID: 1,
      searchBy: "",
      fromdt: "1999-01-01",
      todt: currentISOTime,
      print: 1
    };

    const response = await api.post(endpoint, collectData);
    console.log('TotalDocument Response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('TotalDocument API Error:', error);
    throw error;
  }
};

export const fetchTotalDocumentTypeData = (id:number) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const data = await getTotalDocumentTypeData(id);
    dispatch(setTotalDocumentTypeData(data));
  } catch (error: any) {
    console.error('TotalDocument Fetch Error:', error);
    dispatch(setError(error.message || 'Failed to fetch total document data'));
  }
};

export default totalDocumentTypeSlice.reducer; 