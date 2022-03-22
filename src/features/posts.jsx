import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { DEFAULT_USER_ID as user_id } from "../config/api";

const initialState = {
    count: 0,
    currentPage: 1,
    totalPages: null,
    allPosts: [],
    currentPost: null,
};

export const getAllPosts = createAsyncThunk("posts/getAllPosts", async (page = 1) => {
    try {
        let { data, headers } = await api.get("posts", { params: { page } });
        return { data, headers };
    } catch (err) {
        throw Error(err.message);
    }
});

export const queryAllPosts = createAsyncThunk("posts/queryAllPosts", async ({ title }) => {
    try {
        let { data, headers } = await api.get("posts", { params: { title } });
        return { data, headers };
    } catch (err) {
        throw Error(err.message);
    }
});

export const getPostbyId = createAsyncThunk("posts/getPostbyId", async (id) => {
    try {
        let { data } = await api.get(`posts/${id}`);
        return data;
    } catch (err) {
        throw Error(err.message);
    }
});

export const addPost = createAsyncThunk("posts/addPost", async ({ title, body }) => {
    try {
        console.log(title, body);
        let { data } = await api.post(`posts`, { title, body });
        return data;
    } catch (err) {
        throw Error(err.message);
    }
});

export const updatePostById = createAsyncThunk(
    "posts/updatePostById",
    async ({ id, title, body }) => {
        try {
            console.log(id, title, body);
            let { data } = await api.put(`posts/${id}`, { title, body });
            return data;
        } catch (err) {
            throw Error(err.message);
        }
    }
);

export const deletePostById = createAsyncThunk("posts/deletePostById", async (id) => {
    try {
        await api.delete(`posts/${id}`);
        return id;
    } catch (err) {
        throw Error(err.message);
    }
});

const posts = createSlice({
    name: "posts",
    initialState,
    reducers: {
        clearAllPosts: (state) => {
            state.allPosts = [];
        },
        clearCurrentPost: (state) => {
            state.currentPost = null;
        },
        setCurrentPost: (state, { payload }) => {
            state.currentPost = state.allPosts[payload];
        },
        setNextPage: (state) => {
            state.currentPage += 1;
        },
    },
    extraReducers: {
        [getAllPosts.fulfilled]: (state, { payload }) => {
            state.count = payload.headers["x-pagination-total"];
            state.totalPages = payload.headers["x-pagination-pages"];
            state.currentPage = payload.headers["x-pagination-page"];
            state.allPosts = [...state.allPosts, ...payload.data];
        },
        [getAllPosts.rejected]: (state) => {
            state.allPosts = [];
        },
        [getPostbyId.fulfilled]: (state, { payload }) => {
            state.currentPost = payload;
        },
        [getPostbyId.rejected]: (state) => {
            state.currentPost = null;
        },
        [addPost.fulfilled]: (state, { payload }) => {
            state.allPosts.splice(0, 0, payload);
        },
        [updatePostById.fulfilled]: (state, { payload }) => {
            let updatedPostIndex = state.allPosts.findIndex((post) => post.id === payload.id);
            console.log(state.posts, updatedPostIndex, payload);
            state.currentPost = payload;
            state.allPosts.splice(updatedPostIndex, 1, payload);
        },
        [deletePostById.fulfilled]: (state, { payload }) => {
            let deletedPostIndex = state.allPosts.findIndex((post) => post.id === payload);
            state.allPosts.splice(deletedPostIndex, 1);
        },
        [queryAllPosts.fulfilled]: (state, { payload }) => {
            state.allPosts = payload.data;
        },
    },
});

export const { clearAllPosts, clearCurrentPost, setCurrentPost, setNextPage } = posts.actions;

export const selectPosts = (state) => state.posts;
export const selectPostsCount = (state) => state.posts.count;

export default posts.reducer;
