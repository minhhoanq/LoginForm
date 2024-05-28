import { handleError } from "../helpers/handleError";
import request from "../utils/request";

export interface userSigninParams {
    email: string;
    password: string;
}

export interface userSignupParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface verifyCode {
    code: string;
}

// Google
export const google = async () => {
    return await request
        .get("/auth/google/sign-in/success", {
            withCredentials: true,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
            }, // Nếu cần gửi cookie cùng với yêu cầu
        })
        .then((res) => {
            if (res.status === 200) {
                console.log(res);
                return res.data;
            }
        });
};

export const signin = async (data: userSigninParams) => {
    return await request
        .post("/auth/sign-in", data)
        .then((res) => {
            const response = JSON.parse(res.request.response);
            if (response.status !== 200) {
                return response;
            }

            const tokenObj = {
                at: res.data.metadata.tokens.accessToken,
                email: res.data.metadata.user.email,
            };
            localStorage.setItem("token", JSON.stringify(tokenObj));
            return res.data;
        })
        .catch((error) => {
            handleError(error);
        });
};

export const signup = async (data: userSignupParams) => {
    return await request
        .post("/auth/sign-up", data)
        .then((res) => res.data)
        .catch((error) => {
            throw error;
        });
};

export const finalSignup = async (data: verifyCode) => {
    return await request
        .post("auth/final-sign-up", data)
        .then((res) => {
            const response = JSON.parse(res.request.response);
            if (response.status !== 201) {
                return response;
            }

            const tokenObj = {
                at: res.data.metadata.tokens.accessToken,
                email: res.data.metadata.user.email,
            };
            localStorage.setItem("token", JSON.stringify(tokenObj));
            return res.data;
        })
        .catch((error) => {
            throw error;
        });
};

export const signout = async () => {
    return await request
        .post("/auth/sign-out")
        .then(() => localStorage.removeItem("token"))
        .catch((error) => {
            throw error;
        });
};

export const getMe = async () => {
    return await request
        .get("/auth/me")
        .then((res) => res.data)
        .catch((error) => {
            throw error;
        });
};
