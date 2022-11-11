import { getInitialTheme } from "../../utils/functions";
import { createSlice } from "@reduxjs/toolkit";
import { Theme } from "../../models/models";

interface ThemeState {
  theme: Theme;
}

const initialState: ThemeState = {
  theme: getInitialTheme()
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setDarkTheme: (state) => {
      state.theme = 'dark';   
    },
    setLightTheme: (state) => {
      state.theme = 'light';
    }
  },
  
  },
);

export const { setDarkTheme, setLightTheme } = themeSlice.actions;
export default themeSlice.reducer;
