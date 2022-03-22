import React, { useState } from "react";
import { Card, CardHeader, Typography, Avatar, Box, CardContent, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
import PostForm from "./PostForm";
import { ModeEditOutlined, DeleteOutlineOutlined } from "@mui/icons-material";

const Post = ({ post, updatePost, deletePost, addPost, currentUserName }) => {
    const [editMode, setEditMode] = useState(false);
    const accronym = currentUserName.trim().substring(0, 2).toUpperCase();
    const handleSubmit = (title, text) => {
        updatePost(post.id, title, text);
        setEditMode(false);
    };
    return (
        <Card variant="outlined">
            <CardHeader
                avatar={<Avatar sx={{ bgcolor: red[500] }}>{accronym}</Avatar>}
                action={
                    <>
                        <IconButton onClick={() => setEditMode(true)}>
                            <ModeEditOutlined />
                        </IconButton>
                        <IconButton onClick={() => deletePost(post.id)}>
                            <DeleteOutlineOutlined />
                        </IconButton>
                    </>
                }
                title={
                    <Typography variant="h5" component={"div"}>
                        {post.title}
                    </Typography>
                }
            />
            <CardContent>
                {!editMode && (
                    <Typography variant="body" component={"div"}>
                        {post.body}
                    </Typography>
                )}
                {editMode && (
                    <PostForm
                        submitLabel="Update"
                        hasCancelButton
                        initialTitle={post.title}
                        initialText={post.body}
                        handleSubmit={handleSubmit}
                        handleCancel={() => {
                            setEditMode(false);
                        }}
                    />
                )}
            </CardContent>
        </Card>
    );
};

export default Post;
