import { configureStore } from "@reduxjs/toolkit";
import {
    dashboardReducer,
    postsReducer,
    commentsReducer,
    todosReducer,
    loadingReducer,
} from "../features";

const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,
        posts: postsReducer,
        comments: commentsReducer,
        todos: todosReducer,
        loading: loadingReducer,
    },
});

export default store;
