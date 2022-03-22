import React, { useEffect } from "react";
import { getAllPosts, selectPosts } from "../features/posts";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, Chip, Grid, Typography } from "@mui/material";

const style = {
    display: "flex",
    alignItems: "center",
    width: "300px",
    justifyContent: "space-evenly",
};

const Home = () => {
    const dispatch = useDispatch();
    const { count: postCount, currentPage, allPosts = [] } = useSelector(selectPosts);

    useEffect(() => {
        if (!allPosts.length) dispatch(getAllPosts(currentPage));
    }, [dispatch]);

    return (
        <Grid container height={"100%"} flexDirection={"column"} alignContent={"center"}>
            <Grid item my={2}>
                <Card variant="outlined">
                    <CardContent style={style}>
                        <Typography variant="h3" component={"div"}>
                            Posts
                        </Typography>
                        <Chip label={postCount} size="medium" color="secondary" variant="filled" />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item my={2}>
                <Card variant="outlined">
                    <CardContent style={style}>
                        <Typography variant="h3" component={"div"}>
                            Todos
                        </Typography>
                        <Chip label={postCount} size="medium" color="secondary" variant="filled" />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Home;
