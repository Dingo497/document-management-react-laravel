import { ActionTypes } from "../constants/actionTypes";
import { login, logout, register } from "../../http/authApi";
import { ApiTokenType, AuthLoginFormType, AuthRegisterFormType, setUserActionType } from "../../types/authTypes";
import {logoutDocumentsAction} from './documentActions';
import {logoutTagsAction} from './tagActions';

export const registerAction = (userData: AuthRegisterFormType) => {
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

export const loginAction = (userData: AuthLoginFormType) => {
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

export const logoutAction = (token: ApiTokenType) => {
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
