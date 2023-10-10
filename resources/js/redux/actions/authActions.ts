import { ActionTypes } from "../constants/actionTypes";
import { login, logout, register } from "../../http/authApi";
import { ApiToken, AuthLoginForm, AuthRegisterForm, setUserActionType } from "../../types/auth/authTypes";

export const registerAction = (userData: AuthRegisterForm) => {
    return async (dispatch) => {
        try {
            const { data } = await register(userData);
            return dispatch(setUserAction({
                user: data.data.user,
                token: data.token
            }));
        } catch (error) {
            return error.response.data;
        }
    }
}

export const loginAction = (userData: AuthLoginForm) => {
    return async (dispatch) => {
        try {
            const { data } = await login(userData);
            return dispatch(setUserAction({
                user: data.data.user,
                token: data.token
            }));
        } catch (error) {
            return error.response.data;
        }
    }
}

export const logoutAction = (token: ApiToken) => {
    return async (dispatch) => {
        try {
            await logout(token);
            return dispatch(removeUserAction());
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


export const removeUserAction = () => {
    return {
        type: ActionTypes.LOGOUT,
    };
}
