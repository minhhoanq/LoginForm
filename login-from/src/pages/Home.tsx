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
        <Stack
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
                padding: 4,
                height: "100vh",
            }}
        >
            <Stack
                spacing={4}
                direction={"column"}
                justifyContent={"space-between"}
                alignItems={"center"}
                sx={{
                    height: "200px",
                }}
            >
                <Typography fontSize={32}>
                    Hi, welcome {user.firstName} {user.lastName}, Thanks for
                    watching my test
                </Typography>
                <Stack
                    justifyContent={"center"}
                    sx={{
                        width: "200px",
                    }}
                >
                    <SignoutForm />
                </Stack>
            </Stack>
        </Stack>
    );
}

export default Home;
