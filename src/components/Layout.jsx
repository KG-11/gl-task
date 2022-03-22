import { useNavigate } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Grid,
    Button,
    Badge,
    Container,
    Box,
    Fab,
    useScrollTrigger,
    Zoom,
} from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import HideOnScroll from "./HideOnScroll";

const ScrollTop = ({ children }) => {
    const trigger = useScrollTrigger({
        target: window,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            "#back-to-top-anchor"
        );

        if (anchor) {
            anchor.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    };

    return (
        <Zoom in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: "fixed", bottom: 16, right: 16 }}>
                {children}
            </Box>
        </Zoom>
    );
};

const Layout = ({ postCount = 0, children }) => {
    const navigate = useNavigate();
    return (
        <>
            <AppBar color="default" position="fixed">
                <Toolbar>
                    <Grid container spacing={3} wrap="nowrap" justifyContent="center" width="100vw">
                        <Grid item>
                            <Button variant="outlined" onClick={() => navigate("/dashboard")}>
                                Home
                            </Button>
                        </Grid>
                        <Grid item>
                            <Badge badgeContent={postCount} color="secondary">
                                <Button
                                    variant="outlined"
                                    onClick={() => navigate("/dashboard/posts")}>
                                    Posts
                                </Button>
                            </Badge>
                        </Grid>
                        <Grid item>
                            <Badge badgeContent={postCount} color="secondary">
                                <Button
                                    variant="outlined"
                                    onClick={() => navigate("/dashboard/todos")}>
                                    Todos
                                </Button>
                            </Badge>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Toolbar id="back-to-top-anchor" />
            <Container>
                <Box>{children}</Box>
            </Container>
            <ScrollTop>
                <Fab color="primary" size="medium" aria-label="scroll back to top">
                    <KeyboardArrowUp />
                </Fab>
            </ScrollTop>
        </>
    );
};

export default Layout;
