import SignupFrom from "../components/common/SignupForm";
import { Box, Grid, colors } from "@mui/material";
import assets from "../assets";

export const ScreenMode = {
    SIGN_IN: "SIGN_IN",
    SIGN_UP: "SIGN_UP",
};

const SignupPage = () => {
    const bgImage = assets.images.signupBg;

    return (
        <Grid container sx={{ height: "100vh" }}>
            <Grid item xs={4} sx={{ position: "relative", padding: 3 }}>
                <SignupFrom />
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: "unser",
                        width: `0%`,
                        height: "100%",
                        bgcolor: colors.grey[800],
                        transition: "all 1s ease-in-out",
                    }}
                />
            </Grid>
            <Grid
                item
                xs={8}
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
                        left: 0,
                        right: "unser",
                        width: `0%`,
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
