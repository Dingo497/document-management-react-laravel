import { ActionTypes } from "../constants/actionTypes";
import { login, logout, register } from "../../http/authApi";
import { ApiToken, AuthLoginForm, AuthRegisterForm, setUserActionType } from "../../types/auth/authTypes";
import {logoutDocumentsAction} from './documentActions';
import {logoutTagsAction} from './tagActions';

export const registerAction = (userData: AuthRegisterForm) => {
    return async (dispatch) => {
        try {
            const { data } = await register(userData);
            if (data.status === 'success' && data.token.length > 0) {
                return dispatch(setUserAction({
                    user: data.data.user,
                    token: data.token
                }));
            }
        } catch (error) {
            return error.response.data;
        }
    }
}

export const loginAction = (userData: AuthLoginForm) => {
    return async (dispatch) => {
        try {
            const { data } = await login(userData);
            if (data.status === 'success' && data.token.length > 0) {
                return dispatch(setUserAction({
                    user: data.data.user,
                    token: data.token
                }));
            }
        } catch (error) {
            return error.response.data;
        }
    }
}

export const logoutAction = (token: ApiToken) => {
    return async (dispatch) => {
        try {
            await logout(token);
            dispatch({ type: ActionTypes.LOGOUT_USER });
            dispatch(logoutDocumentsAction());
            dispatch(logoutTagsAction());

        } catch (error) {
            // nedokonceny error handling
            return console.log(error.response.data);
        }
    }
}

export const setUserAction = (userData: setUserActionType) => {
    return {
        type: ActionTypes.SET_USER,
        user: userData.user,
        token: userData.token,
    };
};
