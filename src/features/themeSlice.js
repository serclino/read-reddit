import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDay: true,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state, action) => {
      state.isDay = !state.isDay;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;

export const selectTheme = (state) => state.theme.isDay;
