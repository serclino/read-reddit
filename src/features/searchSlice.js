import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    changeSearchTerm: (state, action) => {
      const { searchTerm } = action.payload;
      state.searchTerm = searchTerm;
    },
  },
});

export const { changeSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;

export const selectSearchTerm = (state) => state.search.searchTerm;
