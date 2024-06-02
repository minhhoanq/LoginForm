import SignoutForm from "../components/common/SignoutForm";
import { Stack, Typography } from "@mui/material";

function Home(props: any) {
    const user = props.user;
    console.log(user);

    return (
        <Stack
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
                padding: 4,
                height: "100vh",
            }}
        >
            <Stack
                spacing={4}
                direction={"column"}
                justifyContent={"space-between"}
                alignItems={"center"}
                sx={{
                    height: "200px",
                }}
            >
                <Typography fontSize={32}>
                    Hi, welcome {user?.firstName} {user?.lastName}, Thanks for
                    watching my test
                </Typography>
                <Stack
                    justifyContent={"center"}
                    sx={{
                        width: "200px",
                    }}
                >
                    <SignoutForm />
                </Stack>
            </Stack>
        </Stack>
    );
}

export default Home;
