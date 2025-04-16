import { LOGIN, LOGOUT, SET_ERROR, SET_USER_DATA } from '../actions/actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  isLoggedIn: boolean;
  user: {
    name: string;
    username: string;
  } | null;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  error: null,
};

const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        error: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: null,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_USER_DATA:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: !!action.payload,
      };
    default:
      return state;
  }
};

// Load user data from AsyncStorage on app start
export const loadUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    if (userData) {
      return {
        type: SET_USER_DATA,
        payload: JSON.parse(userData),
      };
    }
    return {
      type: SET_USER_DATA,
      payload: null,
    };
  } catch (error) {
    console.error('Error loading user data:', error);
    return {
      type: SET_USER_DATA,
      payload: null,
    };
  }
};

export default authReducer;