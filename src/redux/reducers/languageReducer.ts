import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LanguageState {
  currentLanguage: string;
}

const initialState: LanguageState = {
  currentLanguage: 'en',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: {
      reducer: (state, action: PayloadAction<string>) => {
        state.currentLanguage = action.payload;
      },
      prepare: (language: string) => ({
        payload: language,
      }),
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
