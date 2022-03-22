import { useState } from "react";
import {
    TextareaAutosize,
    Button,
    Grid,
    Card,
    CardContent,
    TextField,
    FormGroup,
    FormControlLabel,
} from "@mui/material";

const PostForm = ({
    handleSubmit,
    submitLabel,
    hasCancelButton = false,
    handleCancel,
    initialTitle = "",
    initialText = "",
}) => {
    const [title, setTitle] = useState(initialTitle);
    const [text, setText] = useState(initialText);
    const isSubmitDisabled = title.length === 0 && text.length === 0;
    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit(title, text);
        setTitle("");
        setText("");
    };

    return (
        <form onSubmit={onSubmit} width="100%">
            <Grid container flexDirection={"column"} alignItems={"stretch"} gap="10px">
                <Grid item>
                    <TextField
                        required
                        placeholder="Add title"
                        value={title}
                        style={{ width: "100%", padding: 0 }}
                        p={0}
                        inputProps={{ maxLength: 50 }}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <TextareaAutosize
                        required
                        minRows={6}
                        maxLength={500}
                        placeholder="Add your post..."
                        value={text}
                        style={{ width: "99%" }}
                        onChange={(e) => setText(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <Button
                        type="submit"
                        variant="outlined"
                        disabled={isSubmitDisabled}
                        style={{ marginRight: "10px" }}>
                        {submitLabel}
                    </Button>

                    {hasCancelButton && (
                        <Button
                            type="button"
                            variant="outlined"
                            onClick={handleCancel}
                            style={{ marginRight: "10px" }}>
                            Cancel
                        </Button>
                    )}
                </Grid>
            </Grid>
        </form>
    );
};

export default PostForm;
