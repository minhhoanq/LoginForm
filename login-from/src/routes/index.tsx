import { createBrowserRouter } from "react-router-dom";
import SigninPage from "../pages/SigninPage";
import SignupPage from "../pages/SignupPage";
import AppLayout from "../components/layout/AppLayout";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home";
import ProtectedRoute from "../routes/ProtectedRoute";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import { Product } from "../pages/Product";
import { Pricing } from "../pages/Pricing";

//public router
export const publicRoutes = createBrowserRouter([
    {
        path: "/sign-in",
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <SigninPage />,
            },
        ],
    },
    {
        path: "/sign-up",
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <SignupPage />,
            },
        ],
    },
    {
        path: "/forgot-password",
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <ForgotPasswordPage />,
            },
        ],
    },
    {
        path: "/reset-password/:tokenPassword",
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <ChangePasswordPage />,
            },
        ],
    },
    {
        path: "/",
        element: (
            // <ProtectedRoute>
            // </ProtectedRoute>
            <MainLayout />
        ),
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/product",
                index: true,
                element: <Product />,
            },
            {
                path: "/pricing",
                index: true,
                element: <Pricing />,
            },
            {
                path: "/cart",
                index: true,
                element: <Pricing />,
            },
            {
                path: "/notification",
                index: true,
                element: <Pricing />,
            },
        ],
    },
]);
