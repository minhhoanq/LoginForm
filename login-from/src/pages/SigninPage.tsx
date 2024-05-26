import SigninFrom from "../components/SigninForm";
import { Grid } from "@mui/material";
import assets from "../assets";

export const ScreenMode = {
    SIGN_IN: "SIGN_IN",
    SIGN_UP: "SIGN_UP",
};

const SigninPage = () => {
    const bgImage = assets.images.signinBg;

    return (
        <Grid container sx={{ height: "100vh" }}>
            <Grid item xs={4} sx={{ position: "relative", padding: 3 }}>
                <SigninFrom />
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
            ></Grid>
        </Grid>
    );
};

export default SigninPage;
