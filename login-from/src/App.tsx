import { CssBaseline, GlobalStyles } from "@mui/material";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { AuthProvider, useAuth } from "./utils/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/UserProvider";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
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
                                        <Home />
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="/sign-in" element={<SigninPage />} />
                            <Route path="/sign-up" element={<SignupPage />} />
                        </Routes>
                    </div>
                </Router>
            </UserProvider>
            <ToastContainer />
        </div>
    );
}

export default App;
