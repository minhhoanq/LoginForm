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
import { NavLink, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import logo from "../assets/logo/logo-google.png";
import useAuth from "../hooks/useAuth";
import Loader from "./Loader";

type Inputs = {
    email: string;
    password: string;
};

const SigninFrom = () => {
    const navigate = useNavigate();
    const { handleSignin } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await handleSignin(data)
            .then((res) => {
                console.log(res);
                if (res) {
                    const status: number = res.status;
                    if (status === 200) {
                        navigate("/");
                    } else {
                        throw new Error("");
                    }
                } else {
                    throw new Error("");
                }
            })
            .catch((error) => console.log(error));
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
                        width: "400px",
                    }}
                >
                    <Stack>
                        <Typography
                            variant="h4"
                            fontWeight={600}
                            color={colors.grey[800]}
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
                                                We'll never share your password.
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
                                        <NavLink to={"/"}>
                                            Forgot password
                                        </NavLink>
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
