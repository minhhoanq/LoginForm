import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import ProtectedRoute from "../../routes/ProtectedRoute";
import { UserProvider } from "../../context/UserProvider";

const sidebarWidth = 350;

function MainLayout() {
    return (
        <Box display={"flex"}>
            <Sidebar />
            <Box
                component={"main"}
                sx={{
                    flexGrow: 1,
                    p: 3,
                    height: "100vh",
                    width: { sm: `calc(100% - ${sidebarWidth})` },
                }}
            >
                {/* <ProtectedRoute> */}
                <Outlet />
                {/* </ProtectedRoute> */}
            </Box>
        </Box>
    );
}

export default MainLayout;
