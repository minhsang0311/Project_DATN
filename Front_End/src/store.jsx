
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./client/reducers/authSlice";
export const store = configureStore({
    reducer: {
        auth: authSlice
    }
})