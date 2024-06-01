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
import { SubmitHandler, useForm } from "react-hook-form";
import Loader from "./Loader";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../api/authApi";
import { toast } from "react-toastify";

type Inputs = {
    password: string;
    confirmPassword: string;
    tokenPassword: string;
};

const ChangePasswordForm = () => {
    const params = useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            tokenPassword: params.tokenPassword as string,
        },
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data);
        await resetPassword(data)
            .then((res) => {
                console.log(res);
                const status: number = res.status;

                if (status === 200) {
                    toast.success("Change password success");

                    navigate("/");
                }
            })
            .catch((error) => toast.error(error));
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
                        width: "500px",
                    }}
                >
                    <Stack>
                        <Typography
                            variant="h4"
                            fontWeight={600}
                            color={colors.grey[800]}
                        >
                            Regenerate your password
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
                                            id="password"
                                            type="password"
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
                                                We'll never share your password.
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Stack>
                            </Stack>

                            <Stack spacing={1}>
                                <Stack>
                                    <FormControl>
                                        <InputLabel htmlFor="confirmPassword">
                                            <Stack direction={"row"}>
                                                <Typography>
                                                    Confirm Password
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
                                            id="confirmPassword"
                                            type="password"
                                            aria-describedby="my-helper-text"
                                            {...register("confirmPassword", {
                                                validate: (match) => {
                                                    const password =
                                                        getValues("password");
                                                    return (
                                                        match === password ||
                                                        "Passwords should match!"
                                                    );
                                                },
                                            })}
                                        />
                                        {errors.confirmPassword ? (
                                            <Typography
                                                fontSize={"0.8rem"}
                                                sx={{
                                                    color: colors.red[600],
                                                }}
                                            >
                                                {errors.confirmPassword.message}
                                            </Typography>
                                        ) : (
                                            <FormHelperText id="my-helper-text">
                                                We'll never share your confirm
                                                password.
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

export default ChangePasswordForm;
