import { createContext, useEffect, useState } from "react";
import React from "react";

type Props = { children: React.ReactNode };

const UserContext = createContext<any>({} as any);

export const UserProvider = ({ children }: Props) => {
    const [token, setToken] = useState<string | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setToken(token);
        setIsReady(true);
    }, []);

    const setTokenAction = (tokenString: string) => {
        setToken(tokenString);
    };

    const isLoggedIn = () => {
        return !!token;
    };

    return (
        <UserContext.Provider value={{ isLoggedIn, setTokenAction }}>
            {isReady ? children : null}
        </UserContext.Provider>
    );
};

export const useAuthProvider = () => React.useContext(UserContext);
