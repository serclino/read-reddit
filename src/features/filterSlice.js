import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedFilter: "hot",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      const { nameOfFilter } = action.payload;
      state.selectedFilter = nameOfFilter;
    },
  },
});

export const { changeFilter } = filterSlice.actions;

export default filterSlice.reducer;

export const selectFilter = (state) => state.filter.selectedFilter;
