import { AxiosResponse } from 'axios';
import { backendAPI } from './index';
import {
    ApiAuthSuccessResponseType,
    ApiGetUserResponseType,
    ApiStatusResponseType, ApiTokenType,
    AuthLoginFormType,
    AuthRegisterFormType
} from "../types/authTypes";

export const register = (user: AuthRegisterFormType): Promise<AxiosResponse<ApiAuthSuccessResponseType>> => backendAPI.post('register', user);

export const login = (user: AuthLoginFormType): Promise<AxiosResponse<ApiAuthSuccessResponseType>> => backendAPI.post('login', user);

export const logout = (token: ApiTokenType): Promise<AxiosResponse<ApiStatusResponseType>> => backendAPI.post('logout', {}, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export const getUser = (token: string): Promise<AxiosResponse<ApiGetUserResponseType>> => backendAPI.get('user', {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});
