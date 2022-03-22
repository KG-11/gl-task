import { KeyboardArrowUp } from "@mui/icons-material";
import { Box, Fab, Slide, useScrollTrigger, Zoom } from "@mui/material";

const ScrollTop = ({ trigger, children }) => {
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

const HideOnScroll = ({ children }) => {
    const trigger = useScrollTrigger({
        target: window,
        disableHysteresis: true,
        threshold: 0,
    });
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            <div>{children}</div>
        </Slide>
    );
};

export default HideOnScroll;
