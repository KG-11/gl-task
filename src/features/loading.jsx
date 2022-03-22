import { createSlice } from "@reduxjs/toolkit";
import { getAllPosts, getPostbyId } from "./posts";
const loading = createSlice({
    name: "loading",
    initialState: false,
    reducers: {
        toggleLoading: (state, { payload = false }) => {
            state = payload ? payload : !state;
        },
    },
    extraReducers: {
        [getAllPosts.pending]: () => true,
        [getAllPosts.fulfilled]: (state) => {
            return false;
        },
        [getAllPosts.rejected]: () => false,
        [getPostbyId.pending]: () => true,
        [getPostbyId.fulfilled]: () => false,
        [getPostbyId.rejected]: () => false,
    },
});

export const { toggleLoading } = loading.actions;
export const isLoading = (state) => state.loading;

export default loading.reducer;
