import { userSigninParams, userSignupParams } from "../../api/authApi";

export type UseAuth = {
    handleSignin: (data: userSigninParams) => Promise<any>;
    handleSignup: (data: userSignupParams) => Promise<any>;
    handleSignout: () => Promise<any>;
    handleGetMe: () => Promise<any>;
};
