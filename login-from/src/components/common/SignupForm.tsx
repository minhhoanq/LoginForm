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
import { useState } from "react";
import SubmitCodeModal from "./submitCodeModal";
import { signup } from "../../api/authApi";

type Inputs = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    confirmPassword: string;
};

const SignupFrom = () => {
    const [open, setOpen] = useState(false);
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        // setOpen(true);
        await signup(data)
            .then((res) => {
                if (res) {
                    const status: number = res.status;
                    if (status === 201) {
                        setOpen(true);
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
            {open && <SubmitCodeModal open={open} setOpen={setOpen} />}
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
                            Create account
                        </Typography>

                        <Typography
                            // variant="h4"
                            color={colors.grey[600]}
                        >
                            Doloribus dolorem impedit aliquam sit veniam
                        </Typography>
                    </Stack>
                    <Stack spacing={4}>
                        <Stack spacing={2}>
                            <Stack
                                direction={"row"}
                                justifyContent={"space-between"}
                            >
                                <Stack width={"48%"}>
                                    <FormControl>
                                        <InputLabel htmlFor="firstName">
                                            <Stack direction={"row"}>
                                                <Typography>
                                                    First name
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
                                            id="firstName"
                                            aria-describedby="my-helper-text"
                                            {...register("firstName", {
                                                required:
                                                    "First name is require!",
                                                min: {
                                                    value: 2,
                                                    message:
                                                        "Minimum 2 characters",
                                                },
                                                pattern: {
                                                    value: /([a-zA-Z0-9_\s]+)/g,
                                                    message: "Error message",
                                                },
                                            })}
                                        />
                                        {errors.firstName ? (
                                            <Typography
                                                fontSize={"0.8rem"}
                                                sx={{
                                                    color: colors.red[600],
                                                }}
                                            >
                                                {errors.firstName.message}
                                            </Typography>
                                        ) : (
                                            <FormHelperText id="my-helper-text">
                                                We'll never share your email.
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Stack>
                                <Stack width={"48%"}>
                                    <FormControl>
                                        <InputLabel htmlFor="firstName">
                                            <Stack direction={"row"}>
                                                <Typography>
                                                    Last name
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
                                            id="lastName"
                                            aria-describedby="my-helper-text"
                                            {...register("lastName", {
                                                required:
                                                    "Last name is require!",
                                                min: {
                                                    value: 2,
                                                    message:
                                                        "Minimum 2 characters",
                                                },
                                                pattern: {
                                                    value: /([a-zA-Z0-9_\s]+)/g,
                                                    message: "Error message",
                                                },
                                            })}
                                        />
                                        {errors.lastName ? (
                                            <Typography
                                                fontSize={"0.8rem"}
                                                sx={{
                                                    color: colors.red[600],
                                                }}
                                            >
                                                {errors.lastName.message}
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

                            <Stack>
                                <FormControl>
                                    <InputLabel htmlFor="password">
                                        <Stack direction={"row"}>
                                            <Typography>Password</Typography>
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
                                            required: "Password is require!",
                                            minLength: {
                                                value: 3,
                                                message: "Too Many Characters",
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
                                            We'll never share your email.
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Stack>

                            <Stack>
                                <FormControl>
                                    <InputLabel htmlFor="confirmPassword">
                                        <Stack direction={"row"}>
                                            <Typography>
                                                Confirm password
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
                                            We'll never share your email.
                                        </FormHelperText>
                                    )}
                                </FormControl>
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
                            Sign up
                        </Button>
                    </Stack>
                    <Stack direction={"row"} spacing={2}>
                        <Typography>Don't have an account ?</Typography>
                        <a href={`/sign-in`}>
                            <Typography
                                // onClick={() => onSwitchMode(ScreenMode.SIGN_IN)}
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
                                Sign in
                            </Typography>
                        </a>
                    </Stack>
                </Stack>
            </form>
        </Stack>
    );
};

export default SignupFrom;
