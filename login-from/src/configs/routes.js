import SigninPage from "../pages/SigninPage";
import SignupPage from "../pages/SignupPage";

//public router
export const publicRoutes = [
    { path: "/signin", component: SigninPage, layout: null },
    { path: "/signup", component: SignupPage, layout: null },
];
