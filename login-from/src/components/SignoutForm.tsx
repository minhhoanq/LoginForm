import { Button, Stack } from "@mui/material";
import React from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function SignoutForm() {
    const { handleSignout } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async () => {
        await handleSignout().then(() => {
            navigate("/sign-in");
        });
    };

    return (
        <Stack
            sx={{
                width: "200px",
            }}
        >
            <Button variant="contained" onClick={onSubmit}>
                Sign out
            </Button>
        </Stack>
    );
}

export default SignoutForm;
