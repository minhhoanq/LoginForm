import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/index";
import globalSlice from "./global/index";

export const store = configureStore({
    reducer: {
        global: globalSlice,
        auth: authSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
