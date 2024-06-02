import React from "react";
import ForgotPasswordForm from "../components/common/ForgotPasswordForm";
import { Stack } from "@mui/material";

export default function ForgotPasswordPage() {
    return (
        <Stack justifyContent={"center"} alignItems={"center"} height={"100vh"}>
            <ForgotPasswordForm />
        </Stack>
    );
}
