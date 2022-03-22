import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
    getPostbyId,
    selectPosts,
    addPost,
    updatePostById,
    deletePostById,
} from "../features/posts";
import PostComponent from "../components/Post";
import {
    getCommentsByPostId,
    selectComments,
    addCommentByPostId,
    deleteCommentById,
    updateCommentById,
} from "../features/comments";
import { Box, Stack } from "@mui/material";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";
import { DEFAULT_USER_NAME, DEFAULT_USER_EMAIL } from "../config/api";

const Comments = ({ postId }) => {
    let { comments = [] } = useSelector(selectComments);
    let [activeComment, setActiveComment] = useState(null);
    let dispatch = useDispatch();

    useEffect(() => {
        console.log(postId);
        dispatch(getCommentsByPostId(postId));
    }, [dispatch]);

    const addComment = (body) => {
        console.log(body);
        dispatch(addCommentByPostId({ postId, body }));
    };
    const updateComment = (id, body) => {
        dispatch(updateCommentById({ id, body }));
        setActiveComment(null);
    };
    const deleteComment = (id) => {
        dispatch(deleteCommentById(id));
        setActiveComment(null);
    };

    return (
        <Stack direction="column" justifyContent="center" alignItems="stretch" spacing={3} mt={2}>
            <CommentForm submitLabel="Write" handleSubmit={addComment} />
            {comments.map((comment) => {
                return (
                    <Comment
                        key={comment.id}
                        comment={comment}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        addComment={addComment}
                        deleteComment={deleteComment}
                        updateComment={updateComment}
                        currentUserEmail={DEFAULT_USER_EMAIL}
                    />
                );
            })}
        </Stack>
    );
};

const Post = (props) => {
    let { post_id } = useParams();
    let { currentPost = {} } = useSelector(selectPosts);
    const navigate = useNavigate();
    let dispatch = useDispatch();

    useEffect(() => {
        if (currentPost && Object.keys(currentPost).length) return;
        dispatch(getPostbyId(post_id));
    }, [dispatch]);

    const addNewPost = (title, body) => {
        dispatch(addPost({ title, body }));
    };
    const updatePost = (id, title, body) => {
        dispatch(updatePostById({ id, title, body }));
    };
    const deletePost = (id) => {
        dispatch(deletePostById(id));
        navigate("/dashboard/posts", { replace: "true" });
    };

    return (
        currentPost && (
            <Box mt={5}>
                <PostComponent
                    key={currentPost.id}
                    post={currentPost}
                    addPost={addNewPost}
                    updatePost={updatePost}
                    deletePost={deletePost}
                    currentUserName={DEFAULT_USER_NAME}
                />
                <Comments postId={post_id} />
            </Box>
        )
    );
};

export default Post;
