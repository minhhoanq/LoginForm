import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import {
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    Stack,
    Typography,
    colors,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { finalSignup } from "../api/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "../context/UserProvider";

type Inputs = {
    code: string;
};

export default function SubmitCodeModal({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<any>>;
}) {
    const [minutes, setMinutes] = React.useState(9);
    const [seconds, setSeconds] = React.useState(59);
    const navigate = useNavigate();
    const { setTokenAction } = useAuthProvider();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    React.useEffect(() => {
        const timer = setInterval(() => {
            setSeconds((prev) => prev - 1);
            console.log(minutes + ":" + seconds);
            if (seconds === 0) {
                setMinutes((prev) => prev - 1);
                setSeconds(59);
            }
        }, 1000);

        if (minutes === 0 && seconds === 0) {
            setOpen(false);
        }

        return () => clearInterval(timer);
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data);
        await finalSignup(data).then((res) => {
            console.log(res);
            const status: number = res.status;

            if (status === 201) {
                toast.success("Sign in success");
                const tokenObj = localStorage.getItem("token");
                setTokenAction(tokenObj);

                setOpen(false);

                navigate("/");
            } else {
                toast.error(res.message);
            }
        });
    };

    return (
        <React.Fragment>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog
                    aria-labelledby="nested-modal-title"
                    aria-describedby="nested-modal-description"
                    sx={(theme) => ({
                        [theme.breakpoints.only("xs")]: {
                            top: "unset",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            borderRadius: 0,
                            transform: "none",
                            width: "400px",
                            maxWidth: "unset",
                        },
                    })}
                >
                    <form
                        style={{
                            width: "400px",
                        }}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: "bold",
                            }}
                        >
                            Are you absolutely sure?
                        </Typography>
                        <Stack spacing={2} mt={2}>
                            <Typography>
                                This will permanently delete your account and
                                remove your data from our servers.
                            </Typography>

                            <Stack>
                                <FormControl>
                                    <InputLabel htmlFor="firstName">
                                        <Stack direction={"row"}>
                                            <Typography>Code</Typography>
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
                                        id="code"
                                        aria-describedby="my-helper-text"
                                        {...register("code", {
                                            required: "Code is require!",
                                        })}
                                    />
                                    {errors.code ? (
                                        <Typography
                                            fontSize={"0.8rem"}
                                            sx={{
                                                color: colors.red[600],
                                            }}
                                        >
                                            {errors.code.message}
                                        </Typography>
                                    ) : (
                                        <FormHelperText id="my-helper-text">
                                            Code in your email
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Stack>
                            <Box>
                                Còn lại:{" "}
                                {minutes < 10 ? "0" + minutes : minutes}:
                                {seconds < 10 ? "0" + seconds : seconds}
                            </Box>
                        </Stack>
                        <Box
                            sx={{
                                mt: 1,
                                display: "flex",
                                gap: 1,
                                flexDirection: {
                                    xs: "column",
                                    sm: "row-reverse",
                                },
                            }}
                        >
                            <Button
                                variant="solid"
                                color="primary"
                                type="submit"
                            >
                                Continue
                            </Button>
                            {/* <Button
                                variant="outlined"
                                color="neutral"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button> */}
                        </Box>
                    </form>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}
