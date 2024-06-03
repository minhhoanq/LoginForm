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
            <Grid
                item
                xs={12}
                sm={12}
                md={4}
                sx={{
                    position: "relative",
                    padding: 3,
                    display: "flex",
                    justifyContent: { sm: "center" },
                }}
            >
                <SignupFrom />
            </Grid>
            <Grid
                item
                xs={0}
                sm={0}
                md={8}
                sx={{
                    position: "relative",
                    backgroundImage: `url(${bgImage})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    display: { xs: "none", sm: "block" },
                }}
            ></Grid>
        </Grid>
    );
};

export default SignupPage;
