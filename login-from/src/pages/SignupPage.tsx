import SigninFrom from "../components/SigninFrom";
import SignupFrom from "../components/SignupFrom";
import { Box, Grid, colors } from "@mui/material";
import React, { useState } from "react";
import assets from "../assets";

export const ScreenMode = {
    SIGN_IN: "SIGN_IN",
    SIGN_UP: "SIGN_UP",
};

const SignupPage = () => {
    const [left, setLeft] = useState<any>(0);
    const [right, setRight] = useState<any>("unset");
    const [width, setWidth] = useState(0);

    const [bgImage, SetBgImage] = useState(assets.images.signupBg);
    const [currMode, setCurrMode] = useState(ScreenMode.SIGN_IN);

    const onSwitchMode = (mode: any) => {
        setWidth(100);
        const timeout1 = setTimeout(() => {
            setCurrMode(mode);
            SetBgImage(
                mode === ScreenMode.SIGN_IN
                    ? assets.images.signinBg
                    : assets.images.signupBg
            );
        }, 1100);

        const timeout2 = setTimeout(() => {
            setLeft("unset");
            setRight(0);
            setWidth(0);
        }, 1200);

        const timeout3 = setTimeout(() => {
            setRight("unset");
            setLeft(0);
        }, 2500);

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
            clearTimeout(timeout3);
        };
    };

    return (
        <Grid container sx={{ height: "100vh" }}>
            <Grid item xs={5} sx={{ position: "relative", padding: 3 }}>
                <SignupFrom onSwitchMode={onSwitchMode} />
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: left,
                        right: right,
                        width: `${width}%`,
                        height: "100%",
                        bgcolor: colors.grey[800],
                        transition: "all 1s ease-in-out",
                    }}
                />
            </Grid>
            <Grid
                item
                xs={7}
                sx={{
                    position: "relative",
                    backgroundImage: `url(${bgImage})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: left,
                        right: right,
                        width: `${width}%`,
                        height: "100%",
                        bgcolor: colors.common.white,
                        transition: "all 1s ease-in-out",
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default SignupPage;
