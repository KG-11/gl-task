import { useState } from "react";
import {
    TextareaAutosize,
    Button,
    Grid,
    Card,
    CardContent,
    FormGroup,
    FormControlLabel,
} from "@mui/material";
const CommentForm = ({
    handleSubmit,
    submitLabel,
    hasCancelButton = false,
    handleCancel,
    initialText = "",
}) => {
    const [text, setText] = useState(initialText);
    const isSubmitDisabled = text.length === 0;
    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit(text);
        setText("");
    };
    return (
        <form onSubmit={onSubmit} width="100%">
            <Grid container justifyContent={"stretch"} flexDirection={"column"} gap="10px">
                <Grid item>
                    <TextareaAutosize
                        required
                        minRows={3}
                        maxLength={100}
                        placeholder="Add your comment..."
                        value={text}
                        style={{ width: "99%" }}
                        onChange={(e) => setText(e.target.value)}
                    />
                </Grid>
                <Grid item spacing={3}>
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

export default CommentForm;
