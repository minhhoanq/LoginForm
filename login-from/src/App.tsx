import { CssBaseline, GlobalStyles } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/UserProvider";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import useAuth from "./hooks/useAuth";
import { publicRoutes } from "./routes/index";

function App() {
    const user = useSelector((state: RootState) => state.auth.user);

    // useEffect(() => {
    //     (async function callApi() {
    //         const res = await google();
    //         console.log(res);
    //     })();
    // }, []);

    const userLocalstorage = JSON.parse(
        localStorage.getItem("token") as string
    );

    const { handleGetMe } = useAuth();

    useEffect(() => {
        if (user.id === 0 && userLocalstorage !== null) {
            (async () => {
                await handleGetMe();
            })();
        }
    }, []);

    const globalStyles = {
        a: {
            color: "unset",
            textDecoration: "none",
        },
    };
    return (
        <div>
            <UserProvider>
                <div className="App">
                    <CssBaseline />
                    <GlobalStyles styles={globalStyles} />
                    <RouterProvider router={publicRoutes} />
                </div>
            </UserProvider>
            <ToastContainer />
        </div>
    );
}

export default App;
