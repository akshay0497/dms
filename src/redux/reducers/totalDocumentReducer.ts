import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API_CONFIG } from '../../config/api';
import api from '../../services/api';

interface totalDocumentState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: totalDocumentState = {
  data: null,
  loading: false,
  error: null,
};

const totalDocumentSlice = createSlice({
  name: 'totalDocument',
  initialState,
  reducers: {
    setTotalDocumentData: (state, action: PayloadAction<any>) => {
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

export const { setTotalDocumentData, setLoading, setError } = totalDocumentSlice.actions;

const getTotalDocumentData = async () => {
  try {
    const endpoint = API_CONFIG.ENDPOINTS.AUTH.TotalDocument;
    const fullUrl = `${API_CONFIG.BASE_URL}${endpoint}`;
    console.log('TotalDocument Request Details:', {
      endpoint,
      fullUrl
    });

    const collectData = {
        "docMid": -1,
        "fileTypId": -1,
        "divisionid": -1,
        "subsubjId": -1,
        "user_Id": -1,
        "fileNo": "",
        "complt": ""
    };

    const response = await api.post(endpoint, collectData);
    console.log('TotalDocument Response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('TotalDocument API Error:', error);
    throw error;
  }
};

export const fetchTotalDocumentData = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const data = await getTotalDocumentData();
    dispatch(setTotalDocumentData(data));
  } catch (error: any) {
    console.error('TotalDocument Fetch Error:', error);
    dispatch(setError(error.message || 'Failed to fetch total document data'));
  }
};

export default totalDocumentSlice.reducer; 