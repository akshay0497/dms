import axios from 'axios';
import { API_CONFIG } from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationService } from '../navigations/NavigationService';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

api.interceptors.request.use(
  async (config :any) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('token');
      NavigationService.navigate('Login');
    }
    return Promise.reject(error);
  }
);

// export const login = async (useR_ID: string, password: string) => {
//   try {
//     const endpoint = API_CONFIG.ENDPOINTS.AUTH.LOGIN;
//     const fullUrl = `${API_CONFIG.BASE_URL}${endpoint}`;
//     console.log('Login Request Details:', {
//       endpoint,
//       fullUrl,
//       useR_ID,
//       password
//     });

//     const response = await api.post(endpoint, {
//       useR_ID,
//       password,
//     });
//     console.log("login response : ", response)
//     if (response.data.token) {
//       await AsyncStorage.setItem('token', response.data.token);
//     }
    
//     const userData = {
//       name: response.data.name || useR_ID,
//       username: useR_ID,
//     };
//     await AsyncStorage.setItem('userData', JSON.stringify(userData));
    
//     return {
//       data: userData
//     };
//   } catch (error: any) {
//     throw error;
//   }
// };

export const login = async (useR_ID: string, password: string) => {
  try {
    const endpoint = API_CONFIG.ENDPOINTS.AUTH.LOGIN;
    const fullUrl = `${API_CONFIG.BASE_URL}${endpoint}`;
    console.log('Login Request Details:', { endpoint, fullUrl, useR_ID, password });

    const response = await api.post(endpoint, { useR_ID, password });

    console.log("login response : ", response);

    // ✅ Add check here
    const result = response.data;
    if (!result.isSuccess || !result.data) {
      throw new Error(result.mesg || "Login failed.");
    }

    // ✅ Proceed only if login is successful
    if (result.data.token) {
      await AsyncStorage.setItem('token', result.data.token);
    }

    const userData = {
      name: result.data.name || useR_ID,
      username: useR_ID,
    };
    await AsyncStorage.setItem('userData', JSON.stringify(userData));

    return { data: userData };

  } catch (error: any) {
    console.error('Login error:', error.message);
    throw error;
  }
};


export const logout = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
    console.log('AsyncStorage cleared successfully');
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
    throw error;
  }
};

export default api; 