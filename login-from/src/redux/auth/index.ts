import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// export interface IUser {
//     id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
// }

// interface IInitialState {
//     user: IUser;
// }

const initialState = {
    user: {
        id: 0,
        email: "",
        firstName: "",
        lastName: "",
    },
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        Signin: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
        FindlaSignup: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
        Signout: (state) => {
            state.user = {
                id: 0,
                email: "",
                firstName: "",
                lastName: "",
            };
        },
        GetMe: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
    },
});

export const { Signin, FindlaSignup, Signout, GetMe } = authSlice.actions;
export default authSlice.reducer;
