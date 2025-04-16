import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import languageReducer from './reducers/languageReducer';
import themeReducer from './reducers/themeReducer';
import dashboardReducer from './reducers/dashboardReducer';
import totalDocumentReducer from './reducers/totalDocumentReducer';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    language: languageReducer,
    theme: themeReducer,
    dashboard: dashboardReducer,
    totalDocument: totalDocumentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;