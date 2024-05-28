import { useDispatch } from "react-redux";
import {
    finalSignup,
    getMe,
    signin,
    signout,
    signup,
    userSigninParams,
    userSignupParams,
    verifyCode,
} from "../api/authApi";
import { UseAuth } from "./types/useAuthTypes";
import { GetMe, Signin, Signout, FindlaSignup } from "../redux/auth";

const useAuth = (): UseAuth => {
    const dispatch = useDispatch();

    const handleSignin = async (data: userSigninParams) => {
        try {
            const res = await signin(data);
            if (res.status !== 200) {
                return res;
            }
            dispatch(Signin(res.metadata.user));

            return res;
        } catch (error) {
            console.log("error: " + error);
        }
    };

    const handleFinalSignup = async (data: verifyCode) => {
        try {
            const res = await finalSignup(data);
            dispatch(FindlaSignup(res?.metadata.user));
            return res;
        } catch (error) {
            console.log("error: " + error);
        }
    };

    const handleSignout = async () => {
        try {
            const res = await signout();
            dispatch(Signout());
            return res;
        } catch (error) {
            console.log("error: " + error);
        }
    };

    const handleGetMe = async () => {
        try {
            const res = await getMe();
            dispatch(GetMe(res.metadata.user));
        } catch (error) {
            console.log("error: " + error);
        }
    };

    return {
        handleSignin,
        handleFinalSignup,
        handleSignout,
        handleGetMe,
    };
};

export default useAuth;
