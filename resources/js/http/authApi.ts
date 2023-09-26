import { AxiosResponse } from 'axios';
import { backendAPI } from './index';
import {
    ApiAuthSuccessResponse,
    ApiGetUserResponse,
    ApiStatusResponse, ApiToken,
    AuthLoginForm,
    AuthRegisterForm
} from "../types/auth/authTypes";

export const register = (user: AuthRegisterForm): Promise<AxiosResponse<ApiAuthSuccessResponse>> => backendAPI.post('register', user);

export const login = (user: AuthLoginForm): Promise<AxiosResponse<ApiAuthSuccessResponse>> => backendAPI.post('login', user);

export const logout = (token: ApiToken): Promise<AxiosResponse<ApiStatusResponse>> => backendAPI.post('logout', {}, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export const getUser = (token: string): Promise<AxiosResponse<ApiGetUserResponse>> => backendAPI.get('user', {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});
