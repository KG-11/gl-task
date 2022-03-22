import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
    clearAllPosts,
    getAllPosts,
    queryAllPosts,
    selectPosts,
    setCurrentPost,
    setNextPage,
} from "../features/posts";
import {
    Card,
    CardHeader,
    CardActionArea,
    Typography,
    Avatar,
    Grid,
    Button,
    TextField,
    Link as MuiLink,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { DEFAULT_USER_NAME } from "../config/api";

const Posts = (props) => {
    const { allPosts = [], currentPage = 1, totalPages = 1 } = useSelector(selectPosts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [query, setQuery] = useState(null);

    const accronym = DEFAULT_USER_NAME.trim().substring(0, 2).toUpperCase();
    const canLoadMorePages = currentPage < totalPages;

    const handleClick = (e) => {
        if (!e.target.id) return;
        dispatch(setCurrentPost(e.target.id));
        navigate(`${pathname}/${e.target.id}`);
    };

    const handleRefetch = () => {
        dispatch(getAllPosts(+currentPage + 1));
    };

    const handleSearch = () => {
        dispatch(queryAllPosts({ title: query }));
    };

    useEffect(() => {
        if (!allPosts.length) dispatch(getAllPosts(currentPage));
    }, []);

    useEffect(() => {
        if (query !== null && query.length === 0) dispatch(getAllPosts());
    }, [query]);

    return (
        <>
            <Grid container flexDirection={"column"} alignItems="stretch" gap={"10px"} my={2}>
                <Grid item>
                    <Grid
                        container
                        justifyContent={"space-between"}
                        gap={"10px"}
                        flexWrap={"nowrap"}>
                        <Grid item flexGrow={1}>
                            <TextField
                                required
                                placeholder="Search post by title"
                                value={query}
                                style={{ width: "100%" }}
                                inputProps={{ maxLength: 50 }}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                style={{ height: "100%", marginLeft: "10px" }}
                                onClick={handleSearch}>
                                search
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Button
                        variant="outlined"
                        style={{ width: "100%" }}
                        onClick={() => navigate(`${pathname}/create`)}>
                        Add New Post
                    </Button>
                </Grid>
            </Grid>
            <Grid container onClick={handleClick} columnSpacing={3} flexDirection={"column"}>
                {allPosts.map((post) => (
                    <Grid item my={2} key={post.id}>
                        <Card variant="outlined">
                            <CardActionArea>
                                <CardHeader
                                    avatar={<Avatar sx={{ bgcolor: red[500] }}>{accronym}</Avatar>}
                                    title={
                                        <Typography variant="h3" component={"div"} id={post.id}>
                                            {post.title}
                                        </Typography>
                                    }
                                />
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {!query && canLoadMorePages && (
                <Grid container justifyContent={"center"}>
                    <Grid item my={5}>
                        <MuiLink style={{ cursor: "pointer" }} onClick={handleRefetch}>
                            Load more posts...
                        </MuiLink>
                    </Grid>
                </Grid>
            )}
        </>
    );
};

export default Posts;
