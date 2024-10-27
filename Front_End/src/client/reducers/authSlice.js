import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

export const authSlice = createSlice({
    name: 'Auth',
    initialState: { user: null, token: null, expiresIn: 0 },
    reducers: {
        thoat: (state) => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('expiresIn');
            state.user = null;
            state.token = null;
            state.expiresIn = 0;
        },
        checklogin: (state) => {
            let token = state.token;
            let expiresIn = state.expiresIn;
            let user = state.user;
            let expiresAt = moment().add(expiresIn, 'second');
            let chuaHetHan = moment().isBefore(moment(expiresAt));
            let kq = !token && !user && chuaHetHan;
            if (kq) return;
            token = localStorage.getItem('token');
            user = localStorage.getItem('user');
            expiresIn = localStorage.getItem('expiresIn');
            expiresAt = moment().add(expiresIn, 'second');
            chuaHetHan = moment().isBefore(moment(expiresAt));
            if (token && user && chuaHetHan) {
                state.user = JSON.parse(user);
                state.token = token;
                state.expiresIn = expiresIn;
            }
        },
        dalogin: (state, param) => {
            state.token = param.payload.token;
            state.expiresIn = 3; 
            state.user = param.payload.user;
            localStorage.setItem('token', state.token);
            localStorage.setItem('user', JSON.stringify(state.user));
            localStorage.setItem('expiresIn', state.expiresIn);

            setTimeout(() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('expiresIn');
            }, 10800000); // 3h
        },
    },
});

export const { dalogin, thoat, checklogin } = authSlice.actions;
export default authSlice.reducer;
