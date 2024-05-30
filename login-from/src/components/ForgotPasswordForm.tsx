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
import logo from "../assets/logo/logo-google.png";
import useAuth from "../hooks/useAuth";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { useAuthProvider } from "../context/UserProvider";
import { forgotPassword } from "../api/authApi";

type Inputs = {
    email: string;
};

const ForgotPasswordForm = () => {
    const navigate = useNavigate();
    const { handleSignin } = useAuth();
    const { setTokenAction } = useAuthProvider();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data);
        await forgotPassword(data);
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
                            Forgot password
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
                            Regenerate password
                        </Button>
                    </Stack>

                    <Stack
                        direction={"row"}
                        spacing={2}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <a href={`/sign-in`}>
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
                                    fontWeight: "500",
                                }}
                            >
                                Go to sign in
                            </Typography>
                        </a>
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
                                    fontWeight: "500",
                                }}
                            >
                                Sign up a new account
                            </Typography>
                        </a>
                    </Stack>
                </Stack>
            </form>
        </Stack>
    );
};

export default ForgotPasswordForm;
