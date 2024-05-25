import { Box } from "@mui/material";
import React from "react";

function MainLayout(props: any) {
    return (
        <Box display={"flex"}>
            <Box
                component={"main"}
                sx={{
                    flexGrow: 1,
                    p: 3,
                    height: "100vh",
                }}
            >
                {props.chilren}
            </Box>
        </Box>
    );
}

export default MainLayout;
