import React from "react";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import { Stack } from "@mui/material";

export default function ForgotPasswordPage() {
    return (
        <Stack justifyContent={"center"} alignItems={"center"} height={"100vh"}>
            <ForgotPasswordForm />
        </Stack>
    );
}
