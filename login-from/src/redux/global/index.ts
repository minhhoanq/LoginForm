import { createSlice } from "@reduxjs/toolkit";

interface GlobalState {
    loading: boolean;
}

const initialState: GlobalState = {
    loading: false,
};

const golbalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        startLoading: (state) => {
            state.loading = true;
        },
        stopLoading: (state) => {
            state.loading = false;
        },
    },
});

export const { startLoading, stopLoading } = golbalSlice.actions;

export default golbalSlice.reducer;
