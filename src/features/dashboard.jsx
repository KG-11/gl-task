import { createSlice } from "@reduxjs/toolkit";

const initialState = { count: 0, page: 1, data: [] };

const dashboard = createSlice({
    name: "dashboard",
    initialState: {
        posts: { ...initialState },
        comments: { ...initialState },
        Todos: { ...initialState },
    },
    reducers: {
        initializePosts: (state, action) => {},
        initializeComments: (state, action) => {},
        initializeTodos: (state, action) => {},
    },
});

// const getPostCount

export const { initializePosts, initializeComments, initializeTodos } = dashboard.actions;

export default dashboard.reducer;
