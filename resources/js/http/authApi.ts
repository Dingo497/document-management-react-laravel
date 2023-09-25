import { AxiosResponse } from 'axios';
import { backendAPI } from './index';
import {
    ApiAuthResponse,
    ApiGetUserResponse,
    ApiStatusResponse,
    AuthLoginForm,
    AuthRegisterForm
} from "../types/auth/authTypes";

export const register = (user: AuthRegisterForm): Promise<AxiosResponse<ApiAuthResponse>> => backendAPI.post('register', user);

export const login = (user: AuthLoginForm): Promise<AxiosResponse<ApiAuthResponse>> => backendAPI.post('login', user);

export const logout = (token: string): Promise<AxiosResponse<ApiStatusResponse>> => backendAPI.post('logout', {}, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export const getUser = (token: string): Promise<AxiosResponse<ApiGetUserResponse>> => backendAPI.get('user', {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});
