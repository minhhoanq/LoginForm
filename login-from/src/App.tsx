import { CssBaseline, GlobalStyles } from "@mui/material";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/UserProvider";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import useAuth from "./hooks/useAuth";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";

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
                <Router>
                    <div className="App">
                        <CssBaseline />
                        <GlobalStyles styles={globalStyles} />
                        <Routes>
                            <Route
                                path={"/"}
                                element={
                                    <ProtectedRoute>
                                        <Home user={user} />
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="/sign-in" element={<SigninPage />} />
                            <Route path="/sign-up" element={<SignupPage />} />
                            <Route
                                path="/forgot-password"
                                element={<ForgotPasswordPage />}
                            />

                            <Route
                                path="/reset-password/:tokenPassword"
                                element={<ChangePasswordPage />}
                            />
                        </Routes>
                    </div>
                </Router>
            </UserProvider>
            <ToastContainer />
        </div>
    );
}

export default App;
