import {
    Button,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    Stack,
    Typography,
    colors,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import logo from "../../assets/logo/logo-google.png";
import useAuth from "../../hooks/useAuth";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { useAuthProvider } from "../../context/UserProvider";
import { google } from "../../api/authApi";
// import { useEffect } from "react";
// import { getGoogleOAuthUrl } from "../utils/getGoogleOAuthUrl";
// import { GoogleLogin } from "@react-oauth/google";
// import { google } from "../api/authApi";

type Inputs = {
    email: string;
    password: string;
};

const SigninFrom = () => {
    const navigate = useNavigate();
    const { handleSignin } = useAuth();
    const { setTokenAction } = useAuthProvider();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const hanleGoogleSignin = async () => {
        window.open("http://localhost:8000/api/v1/auth/google", "_self");
    };

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await handleSignin(data)
            .then((res) => {
                const status: number = res.status;

                if (status === 200) {
                    toast.success("Sign in success");
                    const tokenObj = localStorage.getItem("token");
                    setTokenAction(tokenObj);

                    navigate("/");
                } else {
                    toast.error(res.message);
                }
            })
            .catch((error) => toast.error("error: " + error));
    };

    return (
        <Stack
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
                height: "100%",
                width: "100%",
                maxWidth: "700px",
                color: colors.grey[800],
            }}
        >
            <Loader />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack
                    spacing={5}
                    sx={{
                        width: "auto",
                    }}
                >
                    <Stack>
                        <Typography
                            variant="h4"
                            fontWeight={600}
                            color={colors.grey[800]}
                            // fontSize={"1rem"}
                        >
                            Welcome
                        </Typography>

                        <Typography
                            // variant="h4"
                            color={colors.grey[600]}
                        >
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit
                        </Typography>
                    </Stack>
                    <Stack spacing={4}>
                        <Stack spacing={2}>
                            <Stack spacing={1}>
                                <Stack>
                                    <FormControl>
                                        <InputLabel htmlFor="email">
                                            <Stack direction={"row"}>
                                                <Typography>Email</Typography>
                                                <Typography
                                                    sx={{
                                                        marginLeft: "5px",
                                                        color: colors.red[800],
                                                    }}
                                                >
                                                    *
                                                </Typography>
                                            </Stack>
                                        </InputLabel>
                                        <Input
                                            id="email"
                                            type="email"
                                            aria-describedby="my-helper-text"
                                            {...register("email", {
                                                required: "Email is require!",
                                                pattern: {
                                                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                                    message: "Regex email",
                                                },
                                            })}
                                        />
                                        {errors.email ? (
                                            <Typography
                                                fontSize={"0.8rem"}
                                                sx={{
                                                    color: colors.red[600],
                                                }}
                                            >
                                                {errors.email.message}
                                            </Typography>
                                        ) : (
                                            <FormHelperText id="my-helper-text">
                                                We'll never share your email.
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Stack>
                            </Stack>

                            <Stack spacing={1}>
                                <Stack>
                                    <FormControl>
                                        <InputLabel htmlFor="password">
                                            <Stack direction={"row"}>
                                                <Typography>
                                                    Password
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        marginLeft: "5px",
                                                        color: colors.red[800],
                                                    }}
                                                >
                                                    *
                                                </Typography>
                                            </Stack>
                                        </InputLabel>
                                        <Input
                                            type="password"
                                            id="password"
                                            aria-describedby="my-helper-text"
                                            {...register("password", {
                                                required:
                                                    "Password is require!",
                                                minLength: {
                                                    value: 3,
                                                    message:
                                                        "Too Many Characters",
                                                },
                                            })}
                                        />
                                        {errors.password ? (
                                            <Typography
                                                fontSize={"0.8rem"}
                                                sx={{
                                                    color: colors.red[600],
                                                }}
                                            >
                                                {errors.password.message}
                                            </Typography>
                                        ) : (
                                            <FormHelperText id="my-helper-text">
                                                Password must be at least 3
                                                characters long
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Stack>
                                <Stack justifyContent={"flex-end"}>
                                    <Typography
                                        fontSize={"0.9rem"}
                                        sx={{
                                            marginLeft: "auto",
                                            color: colors.blue[600],
                                        }}
                                    >
                                        <Link to={"/forgot-password"}>
                                            Forgot password
                                        </Link>
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{
                                bgcolor: colors.blue[800],
                                "&:hover": {
                                    bgcolor: colors.blue[600],
                                },
                            }}
                        >
                            Sign in
                        </Button>
                    </Stack>

                    <Stack
                        direction={"row"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        sx={{
                            cursor: "pointer",
                        }}
                        onClick={hanleGoogleSignin}
                    >
                        <img
                            src={logo}
                            alt="google"
                            style={{
                                width: "30px",
                            }}
                        />
                        <Typography>Log in with Google</Typography>
                    </Stack>

                    <Stack
                        direction={"row"}
                        spacing={2}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <Typography>Don't have an account ?</Typography>
                        <a href={`/sign-up`}>
                            <Typography
                                // onClick={() => onSwitchMode(ScreenMode.SIGN_UP)}
                                fontWeight={600}
                                sx={{
                                    color: colors.blue[600],
                                    cursor: "pointer",
                                    userSelect: "none",
                                    "&:hover": {
                                        color: colors.blue[400],
                                    },
                                }}
                            >
                                Sign up
                            </Typography>
                        </a>
                    </Stack>
                </Stack>
            </form>
        </Stack>
    );
};

export default SigninFrom;
