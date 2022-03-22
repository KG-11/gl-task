import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import { Box } from "@mui/material";
import { addPost } from "../features/posts";

const CreatePost = (props) => {
    const navigate = useNavigate();
    let dispatch = useDispatch();

    const redirectToPosts = () => navigate("/dashboard/posts");
    const addNewPost = (title, body) => {
        dispatch(addPost({ title, body }));
        redirectToPosts();
    };
    return (
        <Box mt={5}>
            <PostForm
                hasCancelButton
                submitLabel="Write"
                handleSubmit={addNewPost}
                handleCancel={redirectToPosts}
            />
        </Box>
    );
};

export default CreatePost;
