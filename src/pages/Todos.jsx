import React, { useState, useEffect } from "react";
import {
    addTodoByUserId,
    deleteTodoById,
    getTodosByUserId,
    selectTodos,
    updateTodoById,
} from "../features/todos";
import { useDispatch, useSelector } from "react-redux";
import { Stack } from "@mui/material";
import TodoForm from "../components/TodoForm";
import Todo from "../components/Todo";
import { DEFAULT_USER_ID } from "../config/api";

const Todos = (props) => {
    let { todos = [] } = useSelector(selectTodos);
    let [activeTodo, setActiveTodo] = useState(null);
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTodosByUserId());
    }, [dispatch]);

    const addTodo = (title, status) => {
        console.log(title, status);
        dispatch(addTodoByUserId({ title, status }));
    };
    const updateTodo = (id, title, status) => {
        dispatch(updateTodoById({ id, title, status }));
        setActiveTodo(null);
    };
    const deleteTodo = (id) => {
        dispatch(deleteTodoById(id));
        setActiveTodo(null);
    };

    return (
        <Stack direction="column" justifyContent="center" alignItems="stretch" spacing={3} mt={2}>
            <TodoForm submitLabel="add" handleSubmit={addTodo} />
            {todos.map((todo) => {
                return (
                    <Todo
                        key={todo.id}
                        todo={todo}
                        activeTodo={activeTodo}
                        setActiveTodo={setActiveTodo}
                        addTodo={addTodo}
                        deleteTodo={deleteTodo}
                        updateTodo={updateTodo}
                    />
                );
            })}
        </Stack>
    );
};

export default Todos;
