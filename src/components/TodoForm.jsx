import { useState } from "react";
import { Button, Grid, TextField, Checkbox } from "@mui/material";

import { CircleOutlined, CheckCircleOutlineOutlined } from "@mui/icons-material";

const buttonStyles = { marginRight: "10px", height: "100%" };

const TodoForm = ({
    handleSubmit,
    submitLabel,
    hasCancelButton = false,
    handleCancel,
    initialTitle = "",
    initialStatus = "pending",
}) => {
    const [title, setTitle] = useState(initialTitle);
    const [status, setStatus] = useState(initialStatus);
    const isSubmitDisabled = title.length === 0;

    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit(title, status);
        setStatus("pending");
        setTitle("");
    };

    return (
        <form onSubmit={onSubmit} width="100%">
            <Grid container justifyContent={"flex-start"} gap="10px">
                <Grid item>
                    <TextField
                        required
                        placeholder="Add a todo item..."
                        value={title}
                        style={{ width: "100%" }}
                        inputProps={{ maxLength: 50 }}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Grid>
                <Grid item alignSelf={"center"}>
                    <Checkbox
                        disabled={isSubmitDisabled}
                        defaultChecked={status === "completed"}
                        onChange={(e) => setStatus(e.target.checked ? "completed" : "pending")}
                        icon={<CircleOutlined />}
                        checkedIcon={<CheckCircleOutlineOutlined color="success" />}
                    />
                </Grid>
                <Grid item>
                    <Button
                        type="submit"
                        variant="outlined"
                        disabled={isSubmitDisabled}
                        style={buttonStyles}>
                        {submitLabel}
                    </Button>

                    {hasCancelButton && (
                        <Button
                            type="button"
                            variant="outlined"
                            onClick={handleCancel}
                            style={buttonStyles}>
                            Cancel
                        </Button>
                    )}
                </Grid>
            </Grid>
        </form>
    );
};

export default TodoForm;
