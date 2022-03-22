import React from "react";
import { Card, CardHeader, Typography, IconButton, Grid, Checkbox } from "@mui/material";
import TodoForm from "./TodoForm";
import {
    CheckCircleOutlineOutlined,
    CircleOutlined,
    DeleteOutlineOutlined,
    ModeEditOutlined,
} from "@mui/icons-material";

const Todo = ({ todo, setActiveTodo, activeTodo, updateTodo, deleteTodo, addTodo }) => {
    const isEditing = activeTodo && activeTodo.id === todo.id;

    return (
        <Card variant="outlined">
            <CardHeader
                action={
                    <>
                        <IconButton onClick={() => setActiveTodo(todo)}>
                            <ModeEditOutlined />
                        </IconButton>
                        <IconButton onClick={() => deleteTodo(todo.id)}>
                            <DeleteOutlineOutlined />
                        </IconButton>
                    </>
                }
                title={
                    <>
                        {!isEditing && (
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <Typography variant="subtitle1" component={"div"}>
                                        {todo.title}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Checkbox
                                        disabled
                                        checked={todo.status === "completed"}
                                        icon={<CircleOutlined />}
                                        checkedIcon={<CheckCircleOutlineOutlined color="success" />}
                                    />
                                </Grid>
                            </Grid>
                        )}
                        {isEditing && (
                            <TodoForm
                                submitLabel="Update"
                                hasCancelButton
                                initialTitle={todo.title}
                                initialStatus={todo.status}
                                handleSubmit={(title, status) => updateTodo(todo.id, title, status)}
                                handleCancel={() => {
                                    setActiveTodo(null);
                                }}
                            />
                        )}
                    </>
                }
            />
        </Card>
    );
};
export default Todo;
