import { ActionTypes } from "../constants/actionTypes";
import { login, register } from "../../http/authApi";
import { AuthLoginForm, AuthRegisterForm } from "../../types/auth/authTypes";

export const registerAction = (userData: AuthRegisterForm) => {
    return async (dispatch) => {
        try {
            const { data } = await register(userData);
            return dispatch(setUserAction({
                user: data.data.user,
                token: data.token
            }));
        } catch (error) {
            // TODO: spravit nejake zobrazovanie chyb
            return console.log(error.response.data);
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
            // TODO: spravit nejake zobrazovanie chyb
            return console.log(error.response.data);
        }
    }
}

export const setUserAction = (userData: any) => {
    return {
        type: ActionTypes.SET_USER,
        user: userData.user,
        token: userData.token,
    };
};
