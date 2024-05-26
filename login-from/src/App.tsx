import { CssBaseline, GlobalStyles } from "@mui/material";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import { publicRoutes } from "./configs/routes";
// import MainLayout from "./components/layout/defaultLayout/MainLayout";
// import { Fragment } from "react/jsx-runtime";
import Home from "./pages/Home";

function App() {
    const globalStyles = {
        a: {
            color: "unset",
            textDecoration: "none",
        },
    };
    return (
        <Router>
            <div className="App">
                <CssBaseline />
                <GlobalStyles styles={globalStyles} />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/sign-in" element={<SigninPage />} />
                    <Route path="/sign-up" element={<SignupPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
