import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthProvider } from "../context/UserProvider";

type Props = { children: React.ReactNode };

function ProtectedRoute({ children }: Props) {
    const location = useLocation();
    const { isLoggedIn } = useAuthProvider();

    return isLoggedIn() ? (
        <>{children}</>
    ) : (
        <Navigate to={"/sign-in"} state={{ from: location }} replace />
    );
}

export default ProtectedRoute;
