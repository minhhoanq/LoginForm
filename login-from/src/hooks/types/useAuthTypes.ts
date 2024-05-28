import { userSigninParams, verifyCode } from "../../api/authApi";

export type UseAuth = {
    handleSignin: (data: userSigninParams) => Promise<any>;
    handleFinalSignup: (data: verifyCode) => Promise<any>;
    handleSignout: () => Promise<any>;
    handleGetMe: () => Promise<any>;
};
