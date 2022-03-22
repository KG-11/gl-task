import React from "react";
import { Card, CardHeader, Typography, Avatar, CardContent, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
import CommentForm from "./CommentForm";
import { ModeEditOutlined, DeleteOutlineOutlined } from "@mui/icons-material";

const Comment = ({
    comment,
    setActiveComment,
    activeComment,
    updateComment,
    deleteComment,
    addComment,
    currentUserEmail,
}) => {
    const accronym = comment.name.trim().substring(0, 2).toUpperCase();
    const isEditing = activeComment && activeComment.id === comment.id;
    const canDelete = currentUserEmail === comment.email;
    const canEdit = currentUserEmail === comment.email;

    return (
        <Card variant="outlined">
            <CardHeader
                avatar={<Avatar sx={{ bgcolor: red[500] }}>{accronym}</Avatar>}
                action={
                    <>
                        {canEdit && (
                            <IconButton onClick={() => setActiveComment(comment)}>
                                <ModeEditOutlined />
                            </IconButton>
                        )}
                        {canDelete && (
                            <IconButton onClick={() => deleteComment(comment.id)}>
                                <DeleteOutlineOutlined />
                            </IconButton>
                        )}
                    </>
                }
                title={
                    <Typography variant="h6" component={"div"}>
                        {comment.name}
                    </Typography>
                }
                subheader={
                    <Typography variant="subtitle2" component={"div"}>
                        {comment.email}
                    </Typography>
                }
            />
            <CardContent>
                {!isEditing && (
                    <Typography variant="body" component={"div"}>
                        {comment.body}
                    </Typography>
                )}
                {isEditing && (
                    <CommentForm
                        submitLabel="Update"
                        hasCancelButton
                        initialText={comment.body}
                        handleSubmit={(text) => updateComment(comment.id, text)}
                        handleCancel={() => {
                            setActiveComment(null);
                        }}
                    />
                )}
            </CardContent>
        </Card>
    );
};
export default Comment;
