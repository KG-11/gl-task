import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { DEFAULT_USER_EMAIL, DEFAULT_USER_NAME } from "../config/api";

const initialState = { comments: [], currentComment: {} };

export const getCommentsByPostId = createAsyncThunk(
    "comments/getCommentsByPostId",
    async (post_id) => {
        try {
            let { data } = await api.get(`comments`, { params: { post_id: post_id } });
            console.log(data);
            return data;
        } catch (err) {
            console.log(err.message);
            throw Error(err.message);
        }
    }
);

export const addCommentByPostId = createAsyncThunk(
    "comments/addCommentByPostId",
    async ({ postId, body }) => {
        try {
            console.log(postId, body);
            let { data } = await api.post(`posts/${postId}/comments`, {
                body,
                name: DEFAULT_USER_NAME,
                email: DEFAULT_USER_EMAIL,
            });
            return data;
        } catch (err) {
            throw Error(err.message);
        }
    }
);

export const updateCommentById = createAsyncThunk(
    "comments/updateCommentById",
    async ({ id, body }) => {
        try {
            console.log(id, body);
            let { data } = await api.put(`comments/${id}`, { body });
            return data;
        } catch (err) {
            throw Error(err.message);
        }
    }
);

export const deleteCommentById = createAsyncThunk("comments/deleteCommentById", async (id) => {
    try {
        await api.delete(`comments/${id}`);
        return id;
    } catch (err) {
        throw Error(err.message);
    }
});

const comments = createSlice({
    name: "comments",
    initialState,
    extraReducers: {
        [getCommentsByPostId.fulfilled]: (state, { payload }) => {
            state.comments = payload;
        },
        [getCommentsByPostId.rejected]: (state) => {
            console.log("Rejected");
            state.comments = [];
        },
        [addCommentByPostId.fulfilled]: (state, { payload }) => {
            state.comments.splice(0, 0, payload);
        },
        [updateCommentById.fulfilled]: (state, { payload }) => {
            let updatedCommentIndex = state.comments.findIndex(
                (comment) => comment.id === payload.id
            );
            console.log(state.comments, updatedCommentIndex, payload);
            state.comments.splice(updatedCommentIndex, 1, payload);
        },
        [deleteCommentById.fulfilled]: (state, { payload }) => {
            let deletedCommentIndex = state.comments.findIndex((comment) => comment.id === payload);
            state.comments.splice(deletedCommentIndex, 1);
        },
    },
});

export const selectComments = (state) => state.comments;

export default comments.reducer;
