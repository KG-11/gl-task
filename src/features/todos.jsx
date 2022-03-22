import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../config/api";

const initialState = { todos: [], currentTodo: {} };

export const getTodosByUserId = createAsyncThunk("todos/getTodosByUserId", async () => {
    try {
        let { data } = await api.get(`todos`);
        return data;
    } catch (err) {
        throw Error(err.message);
    }
});

export const addTodoByUserId = createAsyncThunk(
    "todos/addTodoByUserId",
    async ({ title, status }) => {
        try {
            console.log(title, status);
            let { data } = await api.post(`todos`, { title, status });
            return data;
        } catch (err) {
            throw Error(err.message);
        }
    }
);

export const updateTodoById = createAsyncThunk(
    "todos/updateTodoById",
    async ({ id, title, status }) => {
        try {
            let { data } = await api.put(`todos/${id}`, { title, status });
            return data;
        } catch (err) {
            throw Error(err.message);
        }
    }
);

export const deleteTodoById = createAsyncThunk("todos/deleteTodoById", async (id) => {
    try {
        await api.delete(`todos/${id}`);
        return id;
    } catch (err) {
        throw Error(err.message);
    }
});

const todos = createSlice({
    name: "todos",
    initialState,
    extraReducers: {
        [getTodosByUserId.fulfilled]: (state, { payload }) => {
            state.todos = payload;
        },
        [getTodosByUserId.rejected]: (state) => {
            state.todos = [];
        },
        [addTodoByUserId.fulfilled]: (state, { payload }) => {
            state.todos.splice(0, 0, payload);
        },
        [updateTodoById.fulfilled]: (state, { payload }) => {
            let updatedCommentIndex = state.todos.findIndex((todo) => todo.id === payload.id);
            state.todos.splice(updatedCommentIndex, 1, payload);
        },
        [deleteTodoById.fulfilled]: (state, { payload }) => {
            let deletedCommentIndex = state.todos.findIndex((todo) => todo.id === payload);
            state.todos.splice(deletedCommentIndex, 1);
        },
    },
});

export const selectTodos = (state) => state.todos;

export default todos.reducer;
