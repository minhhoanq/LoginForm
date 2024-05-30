import { Stack } from "@mui/material";
import React from "react";
import ChangePasswordForm from "../components/ChangePasswordForm";

export default function ChangePasswordPage() {
    return (
        <Stack justifyContent={"center"} alignItems={"center"} height={"100vh"}>
            <ChangePasswordForm />
        </Stack>
    );
}
