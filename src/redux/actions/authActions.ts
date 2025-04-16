import { login as apiLogin, logout as apiLogout } from '../../services/api';
import { LOGIN, LOGOUT, SET_ERROR } from './actionTypes';
import { AppDispatch } from '../store';
import { Alert } from 'react-native';

export const login = (useR_ID: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await apiLogin(useR_ID, password);
    dispatch({
      type: LOGIN,
      payload: response.data,
    });
    Alert.alert(
      'Success',
      'Login successful!',
      [{ text: 'OK' }]
    );
  } catch (error: any) {
    dispatch({
      type: SET_ERROR,
      payload: error.response?.data?.message || 'Login failed',
    });
    Alert.alert(
      'Error',
      error.response?.data?.message || 'Login failed',
      [{ text: 'OK' }]
    );
  }
};

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    await apiLogout();
    dispatch({
      type: LOGOUT,
    });
    Alert.alert(
      'Success',
      'Logged out successfully!',
      [{ text: 'OK' }]
    );
  } catch (error: any) {
    dispatch({
      type: SET_ERROR,
      payload: error.response?.data?.message || 'Logout failed',
    });
    Alert.alert(
      'Error',
      error.response?.data?.message || 'Logout failed',
      [{ text: 'OK' }]
    );
  }
};

interface LoginAction {
  type: typeof LOGIN;
  payload: {
    name: string;
    username: string;
  };
}

interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthActionTypes = LoginAction | LogoutAction; 