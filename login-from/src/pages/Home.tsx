import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import SignoutForm from "../components/SignoutForm";
import { Box, Stack, Typography } from "@mui/material";

function Home() {
    const user = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate();
    const userLocalstorage = JSON.parse(
        localStorage.getItem("token") as string
    );

    const { handleGetMe } = useAuth();

    console.log(userLocalstorage);
    useEffect(() => {
        if (userLocalstorage === null) {
            navigate("/sign-in");
        }
        if (user.id === 0 && userLocalstorage !== null) {
            (async () => {
                await handleGetMe();
            })();
        }
    }, []);

    return (
        <Box
            sx={{
                padding: 4,
            }}
        >
            <Stack
                spacing={4}
                direction={"column"}
                justifyContent={"space-between"}
                sx={{
                    height: "200px",
                }}
            >
                <Typography fontSize={32}>
                    Hi, welcome {user.firstName} {user.lastName}
                </Typography>
                <SignoutForm />
            </Stack>
        </Box>
    );
}

export default Home;
