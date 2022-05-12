import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchTerm: '',
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {},
});

export default searchSlice.reducer;